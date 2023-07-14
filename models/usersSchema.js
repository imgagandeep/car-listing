const mongoogse = require('mongoose')


const usersSchema = new mongoogse.Schema({
    fullName: {
        type: String,
        required: [true, "Full Name should be required."]
    },
    username: {
        type: String,
        required: [true, "Username should be required."]
    },
    password: {
        type: String,
        required: [true, "Password should be required."],
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


module.exports = mongoogse.model('user', usersSchema)
