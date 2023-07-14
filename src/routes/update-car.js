const express = require("express")
const updateCarRouter = express.Router()
const axios = require("axios")
const logger = require("../../loggers/logger")

updateCarRouter.get('', async (req, res) => {
    const accesstoken = req.cookies.accesstoken
    const url = req.originalUrl
    const slug = url.split("/")[2]
    const host = "http://" + req.get('host') + "/api/v1/cars/" + slug

    try {
        const cars = await axios.get(host, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
        res.render('update-car', { cars: cars.data })
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

module.exports = updateCarRouter