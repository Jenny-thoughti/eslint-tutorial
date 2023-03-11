require('dotenv').config();
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const { LogHelper, CommonHelper } = require('./helpers');

const app = require('./app');
const APP_ENV = process.env.NODE_ENV || 'production';
const APP_PORT = process.env.APP_PORT || 5000;
const HTTPS = process.env.HTTPS
    ? JSON.parse(process.env.HTTPS.toLowerCase())
    : true;

// Disabling TLS validation in non production environment
if (APP_ENV != 'production') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
}

let server = null;

// Create an express http server
if (HTTPS != true) {
    server = http.createServer(app);
}

// Create an express https server with self-signed ssl
if (HTTPS == true) {
    // Set SSL Certificates
    const SSL_CRT_FILE = process.env.SSL_CRT_FILE || './src/ssl-keys/cert.pem';
    const SSL_KEY_FILE = process.env.SSL_KEY_FILE || './src/ssl-keys/key.pem';
    const httpsOptions = {
        cert: fs.readFileSync(SSL_CRT_FILE),
        key: fs.readFileSync(SSL_KEY_FILE),
    };

    server = https.createServer(httpsOptions, app);
}

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
