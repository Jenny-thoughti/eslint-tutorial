const express = require('express');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const cors = require('cors');

const routerMain = require('./routes');
const { ApiHelper, LogHelper } = require('./helpers');

const app = express();

const sess = {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {},
};

const APP_ENV = process.env.NODE_ENV || 'development';
// Custom log format for morgan
const logFormat =
    ':remote-addr - :remote-user [:date[clf]] :method :url HTTP/:http-version :status :res[content-length] :response-time ms :referrer :user-agent';

// parse requests of content-type - application/json
app.use(
    express.json({
        limit: '50mb',
    })
);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
    express.urlencoded({
        extended: true,
    })
);

// enabling CORS for all requests
app.use(cors({ origin: '*' }));

if (APP_ENV != 'production') {
    // adding morgan to log all HTTP requests in console
    app.use(morgan(logFormat));
}

if (APP_ENV == 'production') {
    // Disable unnecessary headers
    app.disable('etag');
    app.disable('x-powered-by');

    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.maxAge = 86400000; // set maximum age for cookies
    sess.cookie.secure = true; // serve secure cookies
    sess.store = new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
    });

    // adding Helmet to enhance your API's security
    app.use(
        helmet({
            frameguard: false,
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'default-src': ["'self'", 'cdnjs.cloudflare.com'],
                    'img-src': ["'self'", 'data:'],
                    'script-src': [
                        "'self'",
                        "'unsafe-inline'",
                        'cdnjs.cloudflare.com',
                    ],
                    'style-src': [
                        "'self'",
                        "'unsafe-inline'",
                        'cdnjs.cloudflare.com',
                    ],
                    'frame-src': ["'self'"],
                },
            },
        })
    );

    // check /logs folder exists, if not, create one
    if (!fs.existsSync('logs')) {
        fs.mkdirSync('logs');
        LogHelper.logMessage("\n'/logs' does not exist\n'/logs' created");
    }

    // create a rotating write stream
    const accessLogStream = rfs.createStream(LogHelper.generator, {
        path: path.join(__dirname, '../logs'),
        size: process.env.LOGGER_SIZE,
        maxSize: process.env.LOGGER_MAX_SIZE,
        interval: process.env.LOGGER_INTERVAL,
        compress: true,
    });
    // adding morgan to log all HTTP requests with status 4XX or 5XX in console
    app.use(
        morgan(logFormat, {
            skip: function (req, res) {
                return res.statusCode < 400;
            },
        })
    );
    // adding morgan to log all HTTP requests in logs/access.log file
    app.use(
        morgan(logFormat, {
            stream: accessLogStream,
        })
    );
}

app.use(session(sess));

// import router
app.use('/', routerMain);

app.use((req, res, next) => {
    const err = new Error(process.env.ERR_404);
    err.status = 404;
    next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    const errCode = err.status || 501;
    return ApiHelper.generateApiResponse(res, req, err.message, errCode);
});

module.exports = app;
