const mongoose = require('mongoose')
const { Schema } = mongoose;
const userRequestSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    isRequest: {
        type: String,
        default: ''
    },
    locationId: { type: Schema.Types.ObjectId, ref: "Location" },
    status: {
        type: String,
        default: '' // request_accepted, request_failure, request_pending
    },
    reason: {
        type: String,
        default: ''
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('UserRequest', userRequestSchema)