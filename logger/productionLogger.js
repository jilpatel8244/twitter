const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}] ${message}`;
});

const productionLogger = () => {
    return createLogger({
        level: 'info',
        format: combine(timestamp(), myFormat),
        // defaultMeta: { service: 'user-service' },
        transports: [
            new transports.Console(),
            new transports.File({filename: "myErrors.log"})
        ],
    });
}
module.exports = productionLogger;