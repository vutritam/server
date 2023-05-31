const Order = require('../models/Order')
const Products = require('../models/Products')
const asyncHandler = require('express-async-handler')

const getProductByUserId = asyncHandler(async(req, res)=>{
    const { id } = req.params
    const getProductByIdUser = await Order.findById(id).exec()
    
    if(getProductByIdUser){
       let data = { success: true, data: getProductByIdUser }

       res.status(200).json(data)

       // Gửi dữ liệu mới đến client thông qua Socket.IO
       io.emit('orderDataUpdated', data);
    }
    return res.status(400).json({ message: 'Invalid data received' })
})

const createNewOrder = asyncHandler(async(req, res)=>{
    // const { id } = req.params
    const {tableNumber , productId, location} = req.body
    const getProductById = await Products.findOne(productId).exec()
    const objectOrder = { tableNumber, productId: getProductById, location: location}
       // Create and store new user 
    const orderUser = await Order.create(objectOrder)

    // ví dụ: bàn 1, nước 1, địa điểm: tây ninh

    if (orderUser) { //created 
        res.json({ message: `New order created`, status: 200, data:[], success: true } )
    } else {
        res.json({ message: 'Invalid user data received', status: 400, data:[], success:false })
    }
    
    // if(orderUser){
    //    let data = { success: true, data: getProductById }

    //    res.status(200).json(data)

    //    // Gửi dữ liệu mới đến client thông qua Socket.IO
    //    io.emit('orderDataUpdated', data);
    // }
    return res.status(400).json({ message: 'Invalid data received' })
})

module.exports = {
    getProductByUserId,
    createNewOrder
}