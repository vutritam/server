const req = require('express/lib/request')
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
    const getAllProductOrder = await Order.find({ location: location,  status: { $ne: 'order_deleted' } }).populate('productId').exec()
    // console.log(location,'location');
    if(getAllProductOrder){
       return res.json({ message: `Get all success`, status: 200, data: getAllProductOrder, success: true } )
    }
    return res.json({ message: `Get all failure`, status: 400, data: [], success: false } )
}


const getAllByLocationSocket = asyncHandler(async(data)=>{
    const { location } = data

    const getProductByLocationEmployee = await Order.find({ location: location,  status: { $ne: 'order_deleted' } }).sort({date: -1}).populate('productId').exec()
    // console.log(getProductByLocationEmployee,'getProductByLocationEmployee');
    if(getProductByLocationEmployee){
       let data = { message: `get product success`, success: true, data: getProductByLocationEmployee}
       return data
    }
    return 'Invalid data received'
})

const getAllOrderByNumberTable = async(req, res)=>{
    const { tableNumber } = req.body
    const getProductByTable = await Order.find({ tableNumber: tableNumber }).populate('productId').exec()
    // console.log(tableNumber,'tableNumber');
    if(getProductByTable){
        return res.json({ message: `Get all success`, status: 200, data: getProductByTable, success: true } )
    }
    return res.json({ message: `Get all failure`, status: 400, data: [], success: false } )
}

const getAllOrderByNumberTableAndLocationUser = async(req, res)=>{
    const { tableNumber, location } = req.body
    const getProductByTable = await Order.find({ tableNumber: tableNumber, location: location }).populate('productId').exec()
    // console.log(tableNumber,'tableNumber');
    if(getProductByTable){
        return res.json({ message: `Get all success`, status: 200, data: getProductByTable, success: true } )
    }
    return res.json({ message: `Get all failure`, status: 400, data: [], success: false } )
}
const getAllOrderByUser = async(req, res)=>{
    const getAllOrderByUser = await Order.find().populate('productId').sort({date: -1}).exec()
    if(getAllOrderByUser){
        return res.status(200).json({ message: `Get all success`, status: 200, data: getAllOrderByUser, success: true } )
    }
    return res.status(400).json({ message: `Get all failure`, status: 400, data: [], success: false } )
}

const getProductsByRole =async(req, res) =>{
    const { userRole, location } = req.body
    switch (userRole) {
        case 'admin':
            let getDataAdmin = await Order.find().populate('productId').sort({date: -1}).exec()
            if(getDataAdmin){
                return res.status(200).json({ message: `Get all success`, status: 200, data: getDataAdmin, success: true } )
            }
            return res.status(400).json({ message: `Not found item`, status: 400, data: [], success: false } )
        case 'client':
            let getDataEmployee = await Order.find({ location: location, status: { $ne: 'order_deleted' } }).populate('productId').sort({date: -1}).exec()
            if(getDataEmployee){
                return res.status(200).json({ message: `Get all success`, status: 200, data: getDataEmployee, success: true } )
            }
            return res.status(400).json({ message: `Not found item`, status: 400, data: [], success: false } )
        default:
            break;
    }
}

const deleteOrder = async(req, res)=>{
    const {id, location, status} = req.body
    // console.log(id, location);
    // const deleteItem = await Order.deleteOne({_id: id}).exec()
    const deleteItem = await Order.findByIdAndUpdate(id,{
           status: status,
        }
         ,
         { new: true } // Option để trả về bản ghi đã cập nhật
       );
       console.log("delete", deleteItem)
    
    const getOrderAfterDelete = await Order.find({ location: location, status: { $ne: 'order_deleted' } }).populate('productId').exec()
    if(deleteItem){
        return res.status(200).json({ message: `Delete success`, status: 200, data: getOrderAfterDelete, success: true } )
    }
    return res.status(400).json({ message: `Not found item`, status: 400, data: [], success: false } )
}

const getAllOrderByLocationSocket=async(tableNumber,location )=>{
    const getProductByTable = await Order.find({ tableNumber: tableNumber, location: location }).populate('productId').exec()
    // console.log(tableNumber,'tableNumber');
    if(getProductByTable){
        return getProductByTable
    }
    return getProductByTable
}

const handleDeleteAllOrder=async()=>{
    try {
        const result = await Order.deleteMany({});
        if(result) {
            return res.status(200).json({ message: `Delete all success`, status: 200, success: true } )
        }
        return res.status(400).json({ message: `Can't delete all item`, status: 400, success: false } )
        // console.log(`Số bản ghi đã bị xóa: ${result.deletedCount}`);
      } catch (error) {
        console.error('Lỗi khi xóa bản ghi:', error);
      }
}

const handleUpdateStatusOrder = async(req, res) =>{
    const orderId = req.params.id;
    const { status }= req.body;
    try {
        const updateOrder = await Order.findByIdAndUpdate(
         orderId, {
            status: status
         }
          ,
          { new: true } // Option để trả về bản ghi đã cập nhật
        );
        if (!updateOrder) {
            return res.status(400).json({ message: `Not found item`, status: 400, success: false } )
        }
    
        return res.status(200).json({ message: `update status success`, status: 200, success: true } )
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi server.' });
      }
}


const createNewOrder = async (req, res) => {
    const { tableNumber, productId, location, quantity, description, status } = req.body;

    // Kiểm tra xem có đơn hàng nào đã tồn tại với tableNumber và productId không
    const existingOrder = await Order.findOne({ tableNumber, productId, status: { $ne: 'order_success' } }).exec();
    if (existingOrder) {
        // Nếu đã tồn tại
        if (existingOrder.status !== 'order_success') {
            // Nếu status khác "order_success", cập nhật số lượng
            existingOrder.quantity += quantity;
            await existingOrder.save();

            return res.json({ message: 'Order quantity updated', status: 200, data: existingOrder, success: true });
        } else {
            const objectOrder = { tableNumber, quantity, description, productId, location, status, ...req.body };
            const orderUser = await Order.create(objectOrder);
            if(orderUser) {
                return res.json({ message: 'New order created', status: 200, data: orderUser, success: true });

            }
            // Nếu status là "order_success", trả về thông báo lỗi
            return res.json({ message: 'Cannot update order quantity, order already marked as order_success', status: 400, data: [], success: false });
        }
    } else {
        // Nếu không tồn tại, tạo mới đơn hàng mới
        if (status !== 'order_success') {
            const objectOrder = { tableNumber, quantity, description, productId, location, status, ...req.body };
            const orderUser = await Order.create(objectOrder);

            return res.json({ message: 'New order created', status: 200, data: orderUser, success: true });
        } else {
            console.log('vào Cannot create new order, status is "order_success"');
            // Nếu status là "order_success", trả về thông báo lỗi
            return res.json({ message: 'Cannot create new order, status is "order_success"', status: 400, data: [], success: false });
        }
    }
};





module.exports = {
    getAllByLocationSocket,
    createNewOrder,
    getAllOrderByLocation,
    getAllOrder,
    getAllOrderByNumberTable,
    getAllOrderByUser,
    deleteOrder,
    handleDeleteAllOrder,
    handleUpdateStatusOrder,
    getProductsByRole,
    getAllOrderByLocationSocket,
    getAllOrderByNumberTableAndLocationUser
}