const mongoose = require('mongoose')
const { Schema } = mongoose;


'error_network' // lỗi mạng
'order_success' // order thành công 
'order_failured' // thất bại
'order_pending' // chờ xác nhận
'order_delivery' // đang mang đến (giao hàng)
'order_done' // đã thanh toán hoặc đã hủy món

// -----------------------------------

'user_order' // lỗi mạng
'employee_active' // order thành công 


const notifiSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        default: 0
    },
    dateTime:{
        type: Date,
        default: new Date()
    },
    message: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: 'order_pending'
    },
    checkSeen: {
        type: Boolean,
        default: false
    },
    productId:[ { type: Schema.Types.ObjectId, ref: 'Products' }],
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    workShiftId: { type: Schema.Types.ObjectId, ref: 'WorkShift' },
    isPage: {
        type: String,
        default: ''
    },
    location:{
        type: String,
        default: ''
    }
    
})

module.exports = mongoose.model('notification', notifiSchema)