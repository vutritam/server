const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    file:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    StartDate: {
        type: Date,
        default: Date.now(),
    },
    Like:{
        type: Number,
        default: 0
    },
    Description: {
        type: String,
        default: "",
    },
    position:{
        type: String,
        default: "",
    },
    EndDate: {
        type: Date,
        default:''
    },
    quantity: {
        type: Number,
        default:0
    },
    viewer: {
        type: Number,
        default:0
    },
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Products', productSchema)