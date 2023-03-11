const commonHelpers = require('./common.helper');

const NODE_ENV = process.env.NODE_ENV || 'development';

const logHelpers = {
    generator: (time, index) => {
        if (!time) return 'access.log';

        const month =
            time.getFullYear() + '' + commonHelpers.pad(time.getMonth() + 1);
        const day = commonHelpers.pad(time.getDate());
        const hour = commonHelpers.pad(time.getHours());
        const minute = commonHelpers.pad(time.getMinutes());

        return `${month}/${month}${day}-${hour}${minute}-${index}-access.log.gz`;
    },
    /**
     * Log error message to console.
     * @param {string} msg Error Message
     * @param {object} err Actual error stack object
     * @param {boolean} show Boolean flag whether show message forcefully irrespective of `NODE_ENV`. Default is set to `false`
     */
    logError: (msg = 'Something went wrong.', err = null, show = false) => {
        if (NODE_ENV != 'production' || show) {
            // eslint-disable-next-line no-console
            console.log(
                '\n----------------\nError Start\n----------------\nTimestamp: ' +
                    new Date(),
                '\n',
                '\n' + msg + '\n',
                '\n',
                err,
                '\n----------------\nError End\n----------------\n'
            );
        }
    },
    /**
     * Log general message to console.
     * @param {string} msg Error Message
     * @param {any} data Optional data to be logged along with message
     * @param {boolean} show Boolean flag whether show message forcefully irrespective of `NODE_ENV`. Default is set to `false`
     */
    logMessage: (
        msg = 'Task completed successfully.',
        data = null,
        show = false
    ) => {
        if (NODE_ENV != 'production' || show) {
            if (data != null) {
                // eslint-disable-next-line no-console
                console.log(
                    '\n----------------\nMessage Start\n----------------\nTimestamp: ' +
                        new Date(),
                    '\n',
                    '\n' + msg + '\n',
                    '\n',
                    data,
                    '\n----------------\nMessage End\n----------------\n'
                );
                return;
            }
            // eslint-disable-next-line no-console
            console.log(
                '\n----------------\nMessage Start\n----------------\nTimestamp: ' +
                    new Date(),
                '\n',
                '\n' + msg + '\n',
                '\n----------------\nMessage End\n----------------\n'
            );
        }
    },
};

module.exports = logHelpers;
