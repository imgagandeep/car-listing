require('dotenv').config()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const usersSchema = require('../models/usersSchema')
const carsSchema = require('../models/carsSchema')
const logger = require('../loggers/logger');


// Users Schema
const registerUser = async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const validateUser = await usersSchema.findOne({
        "username": username,
        isDeleted: false
    })
    if (!validateUser) {
        const passwordHash = await securePassword(password);
        const fullName = req.body.fullName
        try {
            const users = await usersSchema.create({
                fullName: fullName,
                username: username,
                password: passwordHash,
            })
            res.status(201).json({
                success: true,
                message: "User has been added successfully.",
                data: users
            })
        } catch (error) {
            logger.error(error)
            res.status(422).json({
                success: false,
                message: "Some fields are missing or required.",
            })
        }
    } else {
        logger.error(error)
        res.status(409).json({
            success: false,
            message: "This username already exist.",
        })
    }
}

const securePassword = async (password) => {
    const passwordHash = await bcrypt.hash(password, process.env.SALTROUNDS)
    return passwordHash
}

const login = async (req, res) => {
    const { username, password } = req.body
    const validateUser = await usersSchema.findOne({
        "username": username,
        isDeleted: false
    })
    const validatePassword = await comparePassword(password, validateUser.password)

    if (validateUser && validatePassword) {
        try {
            const _id = validateUser._id
            const token = jwt.sign({ _id, username }, process.env.JWT_SECRET)
            res.cookie("accesstoken", token, {
                secure: true,
                sameSite: "Lax"
            }).status(200).json({
                success: true,
                message: "User has been logged in successfully.",
                data: token
            })
        } catch {
            logger.error(error)
            res.status(422).json({
                success: false,
                message: "Username or password incorrect.",
            })
        }
    } else {
        logger.error(error)
        res.status(422).json({
            success: false,
            message: "Username or password incorrect.",
        })
    }
}

const comparePassword = async (password, db_password) => {
    const passwordHash = await bcrypt.compare(password, db_password)
    return passwordHash
}

// Cars Schema
const addCar = async (req, res) => {
    let token = req.headers['authorization'].split("Bearer ")[1]
    const token_key = process.env.JWT_SECRET
    const validate = jwt.verify(token, token_key)
    if (validate) {
        var slug = req.body.slug
        const validateCar = await carsSchema.findOne({
            "slug": slug,
            isDeleted: false
        })

        if (!validateCar) {
            try {
                const cars = await carsSchema.create({
                    manufacturer: req.body.manufacturer,
                    model: req.body.model,
                    year: req.body.year,
                    price: req.body.price,
                    slug: req.body.slug,
                })
                res.status(201).json({
                    success: true,
                    message: "Car has been added successfully.",
                    data: cars
                })
            } catch (error) {
                logger.error(error)
                res.status(422).json({
                    success: false,
                    message: "Some fields are missing or required.",
                })
            }
        } else {
            logger.error("This slug already use for another car.")
            res.status(201).json({
                success: true,
                message: "This slug already use for another car.",
                data: cars
            })
        }
    } else {
        logger.error(validate)
        res.status(401).json({
            success: false,
            message: "Authorization token invalid.",
        })
    }
}

const getAllCars = async (req, res) => {
    try {
        let token = req.headers['authorization'].split("Bearer ")[1]
        const token_key = process.env.JWT_SECRET
        const validate = jwt.verify(token, token_key)
        if (validate) {
            const cars = await carsSchema.find({ isDeleted: false })
            res.status(200).json({
                success: true,
                message: "Retrieved all cars successfully.",
                data: cars
            })
        }
    } catch (error) {
        logger.error(error)
        res.status(401).json({
            success: false,
            message: "Authorization token invalid.",
        })
    }
}

const getcarDetail = async (req, res) => {
    let token = req.headers['authorization'].split("Bearer ")[1]
    const token_key = process.env.JWT_SECRET
    const validate = jwt.verify(token, token_key)

    if (validate) {
        try {
            const cars = await carsSchema.findOne({
                slug: req.params.slug,
                isDeleted: false
            })
            res.status(200).json({
                success: true,
                message: "Retrieve car detail successfully.",
                data: cars
            })
        } catch (error) {
            logger.error(error)
            res.status(422).json({
                success: false,
                message: "This slug does not exist in database.",
            })
        }
    } else {
        logger.error(validate)
        res.status(401).json({
            success: false,
            message: "Authorization token invalid.",
        })
    }
}

const updateCar = async (req, res) => {
    let token = req.headers['authorization'].split("Bearer ")[1]
    const token_key = process.env.JWT_SECRET
    const validate = jwt.verify(token, token_key)
    if (validate) {
        try {
            const cars = await carsSchema.findOne({
                _id: req.params.id,
                isDeleted: false
            })

            cars.manufacturer = req.body.manufacturer
            cars.model = req.body.model
            cars.year = req.body.year
            cars.price = req.body.price
            cars.slug = req.body.slug
            cars.updatedAt = Date.now()

            const car_detail_saved_db = await cars.save()
            res.status(200).json({
                success: true,
                message: "Update car detail successfully.",
                data: car_detail_saved_db
            })
        } catch (error) {
            logger.error(error)
            res.status(422).json({
                success: false,
                message: "This ID does not exist in database.",
            })
        }
    } else {
        logger.error(validate)
        res.status(401).json({
            success: false,
            message: "Authorization token invalid.",
        })
    }
}

const deleteCar = async (req, res) => {
    let token = req.headers['authorization'].split("Bearer ")[1]
    const token_key = process.env.JWT_SECRET
    const validate = jwt.verify(token, token_key)

    if (validate) {
        try {
            const cars = await carsSchema.findOne({
                _id: req.params.id,
                isDeleted: false
            })
            cars.isDeleted = true
            const carDeleted = await cars.save()

            res.status(200).json({
                success: true,
                message: "Car deleted successfully."
            })
        } catch (error) {
            logger.error(error)
            res.status(422).json({
                success: false,
                message: "This ID not exist in database.",
            })
        }
    } else {
        logger.error(validate)
        res.status(401).json({
            success: false,
            message: "Authorization token invalid.",
        })
    }
}


module.exports = {
    registerUser,
    login,
    getAllCars,
    addCar,
    getcarDetail,
    updateCar,
    deleteCar,
}

