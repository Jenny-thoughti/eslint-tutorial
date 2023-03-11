require('dotenv').config();
const http = require('http');
const path = require('path');

const { LogHelper, CommonHelper } = require('./helpers');

const APP_ENV = process.env.NODE_ENV || 'production';
const APP_PORT = process.env.APP_PORT || 5000;

// Create an express http server
const app = require('./app');
const server = http.createServer(app);

// Set few global variables
process.env.PATH_ROOT = path.join(__dirname, '..');
process.env.PATH_SRC = path.join(process.env.PATH_ROOT, 'src');
const CURRENT_TIMEZONE = CommonHelper.getTimezone();

// starting the server
server.listen(APP_PORT, () => {
    LogHelper.logMessage(
        '\nApplication started successfully.\nEnvironment ------------> ' +
            APP_ENV +
            '\nTimezone ---------------> ' +
            CURRENT_TIMEZONE.timezone +
            '\nTimezone UTC Offset ----> ' +
            CURRENT_TIMEZONE.utcOffset +
            '\n\nRunning on -----> ' +
            process.env.APP_URL,
        null,
        true
    );
});
