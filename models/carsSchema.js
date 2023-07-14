const mongoogse = require('mongoose')


const carsSchema = new mongoogse.Schema({
    manufacturer: {
        type: String,
        required: [true, "Manufacturer should be required."]
    },
    model: {
        type: String,
        required: [true, "Model should be required."],
        trim: true
    },
    year: {
        type: Number,
        required: [true, "Year should be required."],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Price should be required."],
        trim: true
    },
    slug: {
        type: String,
        required: [true, "Slug should be required."],
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
})


module.exports = mongoogse.model('car', carsSchema)
