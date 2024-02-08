const mongoose = require('mongoose')
const { Schema } = mongoose;

const orderPaymentSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        default: 0
    },
    isPayment: {
        type: Boolean,
        required: true
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    phone: {
        type: String,
        maxlength: 15
    },
    totalPrice: {type: Number, required: true},
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('orderPayment', orderPaymentSchema)