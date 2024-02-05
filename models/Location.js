const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    nameLocation: {
        type: String,
        require: true
    },
   quantityEmployee: {
        type: Number,
        default:0,
   },
    createdAt:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Location', locationSchema)