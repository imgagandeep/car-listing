const express = require("express")
const dashboardRouter = express.Router()
const axios = require("axios")
const logger = require("../../loggers/logger")

dashboardRouter.get('', async (req, res) => {
    const accesstoken = req.cookies.accesstoken
    const host = "http://" + req.get('host') + "/api/v1/cars"

    try {
        const cars = await axios.get(host, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
        res.render('dashboard', { cars: cars.data })
    } catch (error) {
        if (error.response) {
            logger.error(error.response.data)
            logger.error(error.response.status)
            logger.error(error.response.headers)
        } else if (error.request) {
            logger.error(error.request)
        } else {
            logger.error(error.message)
        }
    }
})

module.exports = dashboardRouter