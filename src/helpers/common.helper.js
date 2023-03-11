const { v4: uuidv4 } = require('uuid');

const commonHelpers = {
    /**
     * Generate unique id using UUID v4 standard.
     *
     * @returns Unique id using UUID v4 standard.
     */
    generateUniqueId: () => {
        return uuidv4();
    },
    getTimezone: () => {
        const serverTimezone = {
            timezone: null,
            utcOffset: null,
        };

        serverTimezone.timezone =
            Intl.DateTimeFormat().resolvedOptions().timeZone;
        const offset = new Date().getTimezoneOffset();
        const o = Math.abs(offset);
        serverTimezone.utcOffset =
            (offset < 0 ? '+' : '-') +
            ('00' + Math.floor(o / 60)).slice(-2) +
            ':' +
            ('00' + (o % 60)).slice(-2);

        return serverTimezone;
    },
};

module.exports = commonHelpers;
