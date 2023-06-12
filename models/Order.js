const mongoose = require('mongoose')



'error_network' // lỗi mạng
'order_success' // order thành công 
'order_failured' // thất bại
'order_inprogess' // đang làm món
'order_delivery' // đang mang đến (giao hàng)
'order_done' // đã thanh toán hoặc đã hủy món

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
    status: {
        type: String,
        default:  ''//['error_network', 'order_success', 'order_failured', 'order_inprogess', 'order_delivery','order_done']
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
        default: new Date()
    }
})

module.exports = mongoose.model('orders', orderSchema)