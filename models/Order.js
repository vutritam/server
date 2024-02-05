const mongoose = require('mongoose')
const { Schema } = mongoose;


'error_network' // lỗi mạng
'order_success' // order thành công 
'order_failured' // thất bại
'order_inprogess' // đang làm món
'order_delivery' // đang mang đến (giao hàng)
'order_done' // đã thanh toán hoặc đã hủy món

const orderSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        default: 0
    },
    quantity:{
        type: Number,
        required: true
    },
    productId: { type: Schema.Types.ObjectId, ref: 'Products' },
    locationId: { type: Schema.Types.ObjectId, ref: "Location" },
    description:  {
        type: String,
        default:  ''
    },
    status: {
        type: String,
         required: true//['error_network', 'order_success', 'order_failured', 'order_inprogess', 'order_delivery','order_done']
    },
    isPaid:{
        type: Boolean,
        default: false
    },
    isCancelled:{
        type: Boolean,
        default:false
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('orders', orderSchema)