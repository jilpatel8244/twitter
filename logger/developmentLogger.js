const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, prettyPrint, json } = format;

// const myFormat = printf(({ level, message, timestamp }) => {
//     return `${timestamp} [${level}] ${JSON.stringify(message)}`;
// });


const developmentLogger = () => {
    return createLogger({
        level: 'debug',
        format: combine(timestamp({format : "HH:mm:ss"}), prettyPrint()),
        // defaultMeta: { service: 'user-service' },
        transports: [new transports.Console()],
    });
}

module.exports = developmentLogger;