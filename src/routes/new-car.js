const express = require("express")
const newCarRouter = express.Router()

newCarRouter.get('', async (req, res) => {
    res.render('new-car')
})

module.exports = newCarRouter