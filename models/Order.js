const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        defaultValue: null
    },
    productId: {
        type: String,
        defaultValue: null
    },
    location:{
        type: String,
        defaultValue: null
    },
    date:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('orders', orderSchema)