const mongoose = require('mongoose')
const { Schema } = mongoose;
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
        default: ['employee']
    },
    file:{
        type: String,
        default:'',
    },
    active: {
        type: Boolean,
        default: true
    },
    userRequestId: { type: Schema.Types.ObjectId, ref: 'UserRequest' },
    createdAt:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('User', userSchema)