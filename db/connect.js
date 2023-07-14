const mongoose = require('mongoose')
const logger = require("../loggers/logger")


const connectDB = (url) => {
    return mongoose
        .connect(url)
        .then(() => logger.info('Connected to the DB...'))
        .catch((err) => logger.error(err))
}

module.exports = connectDB
