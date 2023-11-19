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
    infomation:{
        type: String,
        default:'',
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('User', userSchema)