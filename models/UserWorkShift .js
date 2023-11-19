const mongoose = require('mongoose')

const userWorkShift_Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
    },
    shift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorkShift',
    },
    date:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('UserWorkShift', userWorkShift_Schema)