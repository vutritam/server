const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    default: null,
  },
  position: {
    type: String,
    default: null,
  },
  endDate: {
    type: Date,
    default: null
  },
  quantity: {
    type: Number,
    default: 0
  },
  viewer: {
    type: Number,
    default: 0
  },
  status: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Products', productSchema);
