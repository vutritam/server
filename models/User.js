const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        default:''
    },
    location: {
        type: String,
        default:''
    },
    roles: {
        type: [String],
        default: ['client']
    },
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', userSchema)