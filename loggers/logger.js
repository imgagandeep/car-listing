const { createLogger, format, transports } = require('winston');

const customFormat = format.combine(format.timestamp(), format.printf((info) => {
    return `${info.timestamp} - ${info.level} - ${info.message}`
}))

const logger = createLogger({
    format: customFormat,
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'config.log' })
    ]
})

module.exports = logger;