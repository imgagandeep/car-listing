const express = require("express")
const registerRouter = express.Router()

registerRouter.get('', async (req, res) => {
    res.render('register')
})

module.exports = registerRouter