require('dotenv').config()

const express = require("express");
const cookieParser = require('cookie-parser');
const connectDB = require('./db/connect');
const logger = require('./loggers/logger');
const port = process.env.PORT;
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Static Files
app.use(express.static("public"))
app.use("/css", express.static(__dirname + './public/css'))
app.use("/js", express.static(__dirname + './public/js'))

// Templating Engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

// Routes
const loginRouter = require("./src/routes/login")
app.use("/", loginRouter)

const registerRouter = require("./src/routes/register")
app.use("/register", registerRouter)

const dashboardRouter = require("./src/routes/dashboard")
app.use("/dashboard", dashboardRouter)

const newCarRouter = require("./src/routes/new-car")
app.use("/new-car", newCarRouter)

const updateCarRouter = require("./src/routes/update-car")
app.use("/cars/:slug", updateCarRouter)

app.use("/sign-out", loginRouter)

// API routes
const APIRouter = require("./src/routes/router");
app.use("/api/v1", APIRouter)


// Listen on port 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, logger.info(`Server is listening on port ${port}...`))
    } catch (error) {
        logger.error(error);
    }
}

start()

