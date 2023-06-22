const Order = require('../models/Order')
const Products = require('../models/Products')
const asyncHandler = require('express-async-handler')

///
// 1- id bàn
// 2- vị trí
// 3- sản phẩm

// /order/getProductByLocationEmployee/1 

const getAllOrder = asyncHandler(async(req, res)=>{
    const getAllProductOrder = await Order.find().populate('productId').exec()
    if(getAllProductOrder){
       return res.json({ message: `Get all success`, status: 200, data: getAllProductOrder, success: true } )
    }
    return res.json({ message: `Get all failure`, status: 400, data: [], success: false } )
})

const getAllOrderByLocation = async(req, res)=>{
    const { location } = req.body
    const getAllProductOrder = await Order.find({ location: location }).populate('productId').exec()
    console.log(location,'location');
    if(getAllProductOrder){
       return res.json({ message: `Get all success`, status: 200, data: getAllProductOrder, success: true } )
    }
    return res.json({ message: `Get all failure`, status: 400, data: [], success: false } )
}


const getAllByLocationSocket = asyncHandler(async(data)=>{
    const { location } = data

    const getProductByLocationEmployee = await Order.find({ location: location }).populate('productId').exec()
    console.log(getProductByLocationEmployee,'getProductByLocationEmployee');
    if(getProductByLocationEmployee){
       let data = { message: `get product success`, success: true, data: getProductByLocationEmployee}
       return data
    }
    return 'Invalid data received'
})

const getAllOrderByNumberTable = async(req, res)=>{
    const { tableNumber } = req.body

    const getProductByTable = await Order.find({ tableNumber: tableNumber }).populate('productId').exec()
    console.log(tableNumber,'tableNumber');
    if(getProductByTable){
        return res.json({ message: `Get all success`, status: 200, data: getProductByTable, success: true } )
    }
    return res.json({ message: `Get all failure`, status: 400, data: [], success: false } )
}


const createNewOrder = async(req, res)=>{
    const {tableNumber , productId, location, quantity} = req.body
    console.log(quantity,'quantity');
    
    // const getProductById = await Products.findOne({_id: productId}).exec()
    const objectOrder = { tableNumber, quantity, productId: productId, location: location, ...req.body}
    // console.log(req,'objectOrder');
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
}

module.exports = {
    getAllByLocationSocket,
    createNewOrder,
    getAllOrderByLocation,
    getAllOrder,
    getAllOrderByNumberTable
}