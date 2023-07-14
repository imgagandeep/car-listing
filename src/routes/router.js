const express = require("express")
const APIRouter = express.Router();
const {
    registerUser,
    login,
    addCar,
    getAllCars,
    getcarDetail,
    updateCar,
    deleteCar,
} = require('../../controllers/controllers')


APIRouter.route("/register").post(registerUser)
APIRouter.route("/login").post(login)
APIRouter.route("/cars").get(getAllCars).post(addCar)
APIRouter.route("/cars/:id").put(updateCar).post(deleteCar)
APIRouter.route("/cars/:slug").get(getcarDetail)

module.exports = APIRouter