const Order = require('../models/Order')
const Products = require('../models/Products')
const asyncHandler = require('express-async-handler')

///
// 1- id bàn
// 2- vị trí
// 3- sản phẩm

// /order/getProductByLocationEmployee/1 

const getAllProduct = asyncHandler(async(req, res)=>{
    const getAllProductOrder = await Order.find().exec()
    if(getAllProductOrder){
       return res.json({ message: `Get all success`, status: 200, data: getAllProductOrder, success: true } )
    }
    return res.json({ message: `Get all failure`, status: 400, data: [], success: false } )
})

const getProductByLocation = asyncHandler(async(data)=>{
    const { location } = data
    const getProductByLocationEmployee = await Order.find({ location: location }).exec()
    
    if(getProductByLocationEmployee){
       let data = { message: `get product success`, success: true, data: getProductByLocationEmployee}

       return data

       // Gửi dữ liệu mới đến client thông qua Socket.IO
    //    io.emit('orderData', data);
    }
    return 'Invalid data received'
})

const createNewOrder = asyncHandler(async(req, res)=>{
    const {tableNumber , productId, location} = req.body
    const getProductById = await Products.findOne({_id: productId}).exec()
    const objectOrder = { tableNumber, productId: getProductById, location: location, ...req.body}
       // Create and store new user 
    const orderUser = await Order.create(objectOrder)


    // ví dụ: bàn 1, nước 1, địa điểm: tây ninh

    if (orderUser) { //created 
       return res.json({ message: `New order created`, status: 200, data:[], success: true } )
    } else {
        return res.json({ message: 'Invalid user data received', status: 400, data:[], success:false })
    }
    
    // if(orderUser){
    //    let data = { success: true, data: getProductById }

    //    res.status(200).json(data)

    //    // Gửi dữ liệu mới đến client thông qua Socket.IO
    //    io.emit('orderDataUpdated', data);
    // }
})

module.exports = {
    getProductByLocation,
    createNewOrder,
    getAllProduct
}