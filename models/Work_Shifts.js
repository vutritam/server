const mongoose = require('mongoose')

const workShift_Schema = new mongoose.Schema({
    nameWork:{
        type: String,
        default: ''
    },
    start_time: {
        type: Date,
        default: 0
    },
    end_time: {
        type: Date,
        default:0,
   },
    date:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('WorkShift', workShift_Schema)