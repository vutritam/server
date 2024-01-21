const req = require("express/lib/request");
const Order = require("../models/Order");
const Product = require("../models/Products");
const asyncHandler = require("express-async-handler");
const AuthenticationError = require("../config/authenticationError");

///
// 1- id bàn
// 2- vị trí
// 3- sản phẩm

// /order/getProductByLocationEmployee/1

const getAllOrderServices = asyncHandler(async () => {
  try {
    const getAllProductOrder = await Order.find().populate("productId").exec();
    if (getAllProductOrder) {
      return {
        message: `Get all success`,
        status: 200,
        data: getAllProductOrder,
        success: true,
      };
    }

    throw new AuthenticationError("Không tìm thấy đơn order nào", 400);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const getAllOrderByLocationServices = async (orderData) => {
  try {
    const { location } = orderData;
    const getAllProductOrder = await Order.find({
      location: location,
      status: { $ne: "order_deleted" },
    })
      .populate("productId")
      .exec();
    if (getAllProductOrder) {
      return {
        message: `Get all success`,
        status: 200,
        data: getAllProductOrder,
        success: true,
      };
    }
    return {
      message: `Không tìm thấy đơn order nào`,
      status: 400,
      data: [],
      success: false,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllByLocationSocketServices = asyncHandler(async (data) => {
  try {
    const { location } = data;
    const getProductByLocationEmployee = await Order.find({
      location: location,
    })
      .sort({ date: -1 })
      .populate("productId")
      .exec();
    if (getProductByLocationEmployee.length > 0) {
      let data = getProductByLocationEmployee;
      return {
        message: `Get all success`,
        status: 200,
        data: data,
        success: true,
      };
    }
    return {
      message: `thất bại`,
      status: 400,
      data: [],
      success: false,
    };
  } catch (error) {
    throw error;
  }
});

const getAllOrderByNumberTableServices = async (orderData) => {
  const { tableNumber, location } = orderData;

  try {
    const getProductByTable = await Order.find({
      tableNumber: tableNumber,
      location: location,
    })
      .populate("productId")
      .exec();

    if (getProductByTable.length > 0) {
      return {
        message: `Get all success`,
        status: 200,
        data: getProductByTable,
        success: true,
      };
    }
    return {
      message: `Không tìm thấy sản phẩm nào`,
      status: 400,
      data: getProductByTable,
      success: false,
    };
  } catch (error) {
    throw error;
  }
};

const getAllOrderByNumberTableAndLocationUserServices = async (orderData) => {
  try {
    const { tableNumber, location } = orderData;
    const getProductByTable = await Order.find({
      tableNumber: tableNumber,
      location: location,
    })
      .populate("productId")
      .exec();
    if (getProductByTable) {
      return {
        message: `Get all success`,
        status: 200,
        data: getProductByTable,
        success: true,
      };
    }
    return {
      message: `Không tìm thấy sản phẩm nào`,
      status: 400,
      data: getProductByTable,
      success: false,
    };
  } catch (error) {
    throw error;
  }
};
const getAllOrderByUserServices = async () => {
  try {
    const getAllOrderByUser = await Order.find()
      .populate("productId")
      .sort({ date: -1 })
      .exec();
    if (getAllOrderByUser) {
      return {
        message: `Get all success`,
        status: 200,
        data: getAllOrderByUser,
        success: true,
      };
    }
    throw new AuthenticationError("Không tìm thấy sản phẩm nào", 400);
  } catch (error) {
    throw error;
  }
};

const getProductsByRoleServices = async (orderData) => {
  try {
    const { userRole, location } = orderData;
    switch (userRole) {
      case "admin":
        let getDataAdmin = await Order.find()
          .populate("productId")
          .sort({ date: -1 })
          .exec();
        if (getDataAdmin) {
          return {
            message: `Get all success`,
            status: 200,
            data: getDataAdmin,
            success: true,
          };
        }
        return {
          message: `Không tìm thấy order nào`,
          status: 400,
          data: getOrderAfterDelete,
          success: false,
        };

      case "employee":
        let getDataEmployee = await Order.find({
          location: location,
          status: { $ne: "order_deleted" },
        })
          .populate("productId")
          .sort({ date: -1 })
          .exec();
        if (getDataEmployee) {
          return {
            message: `Get all success`,
            status: 200,
            data: getDataEmployee,
            success: true,
          };
        }
        return {
          message: `Không tìm thấy order nào`,
          status: 400,
          data: [],
          success: false,
        };
      default:
        break;
    }
  } catch (error) {
    throw error;
  }
};

const deleteOrderServices = async (orderData) => {
  try {
    const { id, location, status } = orderData;
    const deleteItem = await Order.findByIdAndUpdate(
      id,
      {
        status: status,
      },
      { new: true } // Option để trả về bản ghi đã cập nhật
    );

    const getOrderAfterDelete = await Order.find({
      location: location,
      status: { $ne: "order_deleted" },
    })
      .populate("productId")
      .exec();
    if (deleteItem) {
      return {
        message: `Delete success`,
        status: 200,
        data: getOrderAfterDelete,
        success: true,
      };
    }
    return {
      message: `Không tìm thấy order nào`,
      status: 400,
      data: getOrderAfterDelete,
      success: false,
    };
  } catch (error) {
    throw error;
  }
};

const getAllOrderByLocationSocketServices = async (tableNumber, location) => {
  try {
    const getProductByTable = await Order.find({
      tableNumber: tableNumber,
      location: location,
    })
      .populate("productId")
      .exec();
    if (getProductByTable) {
      return {
        success: true,
        statusCode: 200,
        message: "Lấy thành công",
        data: getProductByTable,
      };
    }
    return {
      success: false,
      statusCode: 400,
      message: "Lấy thất bại kiểm tra lại data",
      data: [],
    };
  } catch (error) {
    throw error;
  }
};

const handleDeleteAllOrderServices = async () => {
  try {
    const result = await Order.deleteMany({});
    if (result) {
      return { message: `Delete all success`, status: 200, success: true };
    }
    throw new AuthenticationError("Can't delete all item", 400);
  } catch (error) {
    throw error;
  }
};

const handleUpdateStatusOrderServices = async (orderData, orderId) => {
  const { status } = orderData;
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        status: status,
      },
      { new: true } // Option để trả về bản ghi đã cập nhật
    );
    if (!updateOrder) {
      return {
        success: false,
        statusCode: 400,
        message: "Không tìm thấy item nào",
        data: [],
      };
    }
    return {
      success: true,
      statusCode: 200,
      message: "Cập nhật thành công",
      data: [],
    };
  } catch (error) {
    throw error;
  }
};

const createNewOrderServices = async (orderData) => {
  try {
    const { tableNumber, productId, location, quantity, description, status } =
      orderData;
    // Kiểm tra xem có đơn hàng nào đã tồn tại với tableNumber và productId không
    const existingOrder = await Order.findOne({
      tableNumber,
      productId,
      location,
      status: { $nin: ["order_success", "order_deleted"] },
    }).exec();
    const productItem = await Product.findOne({ _id: productId }).exec();
    if (existingOrder && productItem && productItem.quantity > 0 ) {
      
      // Nếu đã tồn tại
      if (existingOrder.status !== "order_success" ) {
        if(productItem.quantity <= 0 ){
          return {
            success: false,
            statusCode: 400,
            message: "hết hàng",
            data: [],
          };
        }
        if((productItem.quantity - quantity ) < 0){
          return {
            success: false,
            statusCode: 400,
            message: "vượt quá số lượng",
            data: [],
          };
        }
        existingOrder.quantity += quantity;
        productItem.status = false;
        productItem.quantity -= quantity;
        await productItem.save();
        await existingOrder.save();
        return {
          success: true,
          statusCode: 200,
          data: [],
        };
      } else {
        const objectOrder = {
          tableNumber,
          quantity,
          description,
          productId,
          location,
          status,
        };
        const orderUser = await Order.create(objectOrder);
        if (orderUser) {
          productItem.status = false;
          productItem.quantity -= quantity;
          await productItem.save();
          return {
            success: true,
            statusCode: 200,
            message: "Tạo mới order thành công",
            data: orderUser,
          };
        } else {
          return {
            success: false,
            statusCode: 400,
            message: "Tạo mới order thất bại",
            data: [],
          };
        }
      }
    } else {
      // Nếu không tồn tại, tạo mới đơn hàng mới
      if (status !== "order_success" && productItem.quantity > 0) {
        const objectOrder = {
          tableNumber,
          quantity,
          description,
          productId,
          location,
          status,
        };
        const orderUser = await Order.create(objectOrder);
        if (orderUser) {
            productItem.status = false;
            productItem.quantity -= quantity;
            await productItem.save();
           
          return {
            success: true,
            statusCode: 200,
            message: "Tạo mới thành công",
            data: orderUser,
          };
        }
        return {
          success: false,
          statusCode: 400,
          message: "Tạo mới order thất bại",
          data: [],
        };
      } else {
        // Nếu status là "order_success", trả về thông báo lỗi
        return {
          success: false,
          statusCode: 400,
          message: "Tạo mới order thất bại do hết hàng",
          data: [],
        };
      }
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllByLocationSocketServices,
  createNewOrderServices,
  getAllOrderByLocationServices,
  getAllOrderServices,
  getAllOrderByNumberTableServices,
  getAllOrderByUserServices,
  deleteOrderServices,
  handleDeleteAllOrderServices,
  handleUpdateStatusOrderServices,
  getProductsByRoleServices,
  getAllOrderByLocationSocketServices,
  getAllOrderByNumberTableAndLocationUserServices,
};
