const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products',  required: true, },
  like: {
    type: Number,
    default: 0
  },
  location:{
    type: String,
    default: ''
},
  tableNumber: {
    type: Number,
    required: true,
    default: 0
},
  dislike: {
    type: Number,
    default: 0
  },
  createdAt:{
    type: Date,
    default: new Date()
}
});
module.exports = mongoose.model("Like", likeSchema);
