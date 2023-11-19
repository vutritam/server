const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    nameLocation: {
        type: Number,
        default: 0
    },
   address: {
        type: String,
        default:'',
   },
    date:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Location', locationSchema)