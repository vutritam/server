const Order = require("../models/Order");
const Product = require("../models/Products");
const asyncHandler = require("express-async-handler");
const AuthenticationError = require("../config/authenticationError");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

///
// 1- id bàn
// 2- vị trí
// 3- sản phẩm

// /order/getProductByLocationEmployee/1

const getAllOrderServices = asyncHandler(async () => {
  try {
    const getAllProductOrder = await Order.find()
      .populate("productId")
      .populate("locationId")
      .exec();
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
    const { locationId } = orderData;
    const getAllProductOrder = await Order.find({
      locationId: locationId,
      status: { $ne: "order_deleted" },
    })
      .populate("productId")
      .populate("locationId")
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
    const { locationId } = data;
    const getProductByLocationEmployee = await Order.find({
      locationId: locationId,
    })
      .sort({ date: -1 })
      .populate("productId")
      .populate("locationId")
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
  const { tableNumber, locationId } = orderData;

  try {
    const getProductByTable = await Order.find({
      tableNumber: tableNumber,
      locationId: locationId,
      status: { $ne: "order_done" }, // Lọc các trạng thái không phải 'order_done'
      isPaid: false,
    })
      .populate("productId")
      .populate("locationId")
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
    const { tableNumber, locationId } = orderData;
    const getProductByTable = await Order.find({
      tableNumber: tableNumber,
      locationId: locationId,
    })
      .populate("productId")
      .populate("locationId")
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
      .populate("locationId")
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
    const { userRole, locationId } = orderData;
    switch (userRole) {
      case "admin":
        let getDataAdmin = await Order.find()
          .populate("productId")
          .populate("locationId")
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
          locationId: locationId,
          status: { $ne: "order_deleted" },
        })
          .populate("productId")
          .populate("locationId")
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
    const { id, locationId, status } = orderData;
    const deleteItem = await Order.findByIdAndUpdate(
      id,
      {
        status: status,
      },
      { new: true } // Option để trả về bản ghi đã cập nhật
    );

    const getOrderAfterDelete = await Order.find({
      locationId: locationId,
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

const getAllOrderByLocationSocketServices = async (tableNumber, locationId) => {
  try {
    const getProductByTable = await Order.find({
      tableNumber: tableNumber,
      locationId: locationId,
    })
      .populate("productId")
      .populate("locationId")
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

const updatePaymentForTableNumberService = async (orderData) => {
  try {
    const { tableNumber, objValues } = orderData;

    //lưu trạng thái cập nhật vào cơ sở dữ liệu dùng updateOne hoặc updateMany của Mongoose
    const updateStatusOrderPayment = await Order.updateMany(
      {
        tableNumber: tableNumber,
        status: { $nin: ["order_inprogess", "order_failured"] },
      },
      { $set: objValues }
    ); // ex: { fieldName: true }

    if (!updateStatusOrderPayment) {
      throw new AuthenticationError("Thất bại vui lòng kiểm tra lại", 400);
    }

    return {
      success: true,
      statusCode: 200,
      message: "Thành công",
      data: [],
    };
  } catch (error) {
    throw error;
  }
};

const createNewOrderServices = async (orderData) => {
  try {
    const {
      tableNumber,
      productId,
      locationId,
      quantity,
      description,
      status,
    } = orderData;

    // Kiểm tra xem có đơn hàng nào đã tồn tại với tableNumber và productId không
    const existingOrder = await Order.findOne({
      tableNumber,
      productId,
      locationId,
      status: { $nin: ["order_success", "order_deleted", "order_done"] },
    }).exec();
    console.log(existingOrder, "existingOrder");
    const productItem = await Product.findOne({ _id: productId }).exec();

    if (existingOrder && productItem) {
      // Nếu đã tồn tại
      if (
        existingOrder.status !== "order_success" &&
        existingOrder.status !== "order_done"
      ) {
        if (
          (productItem.quantity - quantity > 0 && productItem.quantity > 0) ||
          (productItem.quantity - quantity === 0 && productItem.quantity > 0)
        ) {
          existingOrder.quantity += quantity;
          if (existingOrder?.description !== description) {
            existingOrder.description = description;
          }
          if (existingOrder.status !== status) {
            existingOrder.status = status;
          }
          productItem.status = false;
          productItem.quantity -= quantity;
          await productItem.save();
          await existingOrder.save();
          return {
            success: true,
            statusCode: 200,
            data: [],
          };
        } else if (
          productItem.quantity - quantity > 0 &&
          quantity < existingOrder.quantity
        ) {
          existingOrder.quantity += quantity;
          existingOrder.status = status;
          productItem.status = false;
          productItem.quantity += quantity;
          await productItem.save();
          await existingOrder.save();
          return {
            success: true,
            statusCode: 200,
            data: [],
          };
        } else if (productItem.quantity === 0) {
          return {
            success: false,
            statusCode: 400,
            message: "Đã hết hàng",
            data: [],
          };
        } else {
          return {
            success: false,
            statusCode: 400,
            message: "Vượt quá số lượng",
            data: [],
          };
        }
      } else {
        const objectOrder = {
          tableNumber,
          quantity,
          description,
          productId,
          locationId,
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
      if (
        status !== "order_success" &&
        status !== "order_done" &&
        productItem &&
        productItem.quantity > 0
      ) {
        const objectOrder = {
          tableNumber,
          quantity,
          description,
          productId,
          locationId,
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
          message: "Đã hết hàng",
          data: [],
        };
      }
    }
  } catch (error) {
    throw error;
  }
};

const createNewMuptipleOrderServices = async (orderData) => {
  try {
    const {
      tableNumber,
      productId,
      locationId,
      quantity,
      description,
      status,
    } = orderData;
    // Kiểm tra xem có đơn hàng nào đã tồn tại với tableNumber và productId không
    const existingOrders = await Order.find({
      tableNumber,
      productId: { $in: productId }, // mảng productId
      locationId,
      status: { $nin: ["order_success", "order_deleted", "order_done"] },
    }).exec();
    let results = [];
    const newProductIds = productId.filter(
      (productId) =>
        !existingOrders.some(
          (order) => order.productId.toString() === productId
        )
    );
    if (existingOrders.length > 0) {
      if (newProductIds.length > 0) {
        newProductIds.forEach(async (productId) => {
          const quantityClient = quantity.find(
            (item) => item.id === productId
          )?.quantity;

          // Tạo mới đơn hàng cho sản phẩm chưa tồn tại
          const orderUpdated = await Order.create({
            tableNumber,
            productId: productId,
            locationId,
            quantity: quantityClient,
            description,
            status,
          });
          // Cập nhật số lượng sản phẩm
          const filterProduct = await Product.findOne({
            _id: productId,
          }).exec();
          if (filterProduct && filterProduct.quantity > 0) {
            const productUpdated = await Product.updateOne(
              { _id: productId },
              { $set: { quantity: filterProduct.quantity - quantityClient } }
            );
            if (productUpdated && orderUpdated) {
              results.push({
                success: true,
                statusCode: 200,
                message: "Thành công",
                data: [],
              });
            } else {
              results.push({
                success: false,
                statusCode: 400,
                message: "Có lỗi trong quá trình cập nhật",
                data: [],
              });
            }
          } else {
            results.push({
              success: false,
              statusCode: 400,
              message: "Hết hàng",
              data: [],
            });
          }
        });
      }
      // duyệt mảng
      await Promise.all(
        existingOrders.map(async (order) => {
          const productIdItem = order.productId;
          const itemFilterQuantity = quantity.find(
            (element) => element.id === order.productId.toString()
          )?.quantity;
          const updatedQuantity = itemFilterQuantity;
          // Cập nhật số lượng cho đơn hàng tồn tại
          const orderUpdated = await Order.updateOne(
            { productId: productIdItem },
            { $set: { quantity: updatedQuantity } }
          );
          const filterProduct = await Product.findOne({
            _id: productId,
          }).exec();
          if (
            filterProduct &&
            filterProduct.quantity > 0 &&
            filterProduct.quantity >= updatedQuantity
          ) {
            const productUpdated = await Product.updateOne(
              { _id: productId },
              { $set: { quantity: filterProduct.quantity - updatedQuantity } }
            );
            if (productUpdated && orderUpdated) {
              results.push({
                success: true,
                statusCode: 200,
                message: "Thành công",
                data: [],
              });
            } else {
              results.push({
                success: false,
                statusCode: 400,
                message: "Có lỗi trong quá trình cập nhật",
                data: [],
              });
            }
          } else if (
            filterProduct &&
            filterProduct.quantity < updatedQuantity
          ) {
            results.push({
              success: false,
              statusCode: 400,
              message: "Vượt quá số lượng",
              data: [],
            });
          } else {
            results.push({
              success: false,
              statusCode: 400,
              message: "Hết hàng",
              data: [],
            });
          }
        })
      );
    } else {
      await Promise.all(
        newProductIds.map(async (productId) => {
          const quantityClient = quantity.find(
            (item) => item.id === productId
          )?.quantity;
          try {
            const filterProduct = await Product.findOne({
              _id: productId,
            }).exec();
            // Cập nhật số lượng sản phẩm
            if (
              filterProduct &&
              filterProduct.quantity > 0 &&
              filterProduct.quantity > quantityClient
            ) {
              // Tạo mới đơn hàng cho sản phẩm chưa tồn tại
              const orderCreated = await Order.create({
                tableNumber,
                productId: productId,
                locationId,
                quantity: quantityClient,
                description,
                status,
              });
              const productUpdated = await Product.updateOne(
                { _id: productId },
                { $set: { quantity: filterProduct.quantity - quantityClient } }
              );
              if (productUpdated && orderCreated) {
                results.push({
                  success: true,
                  statusCode: 200,
                  message: "Thành công",
                  data: [],
                });
              } else {
                results.push({
                  success: false,
                  statusCode: 400,
                  message: "Có lỗi trong quá trình cập nhật",
                  data: [],
                });
              }
            } else if (
              filterProduct &&
              filterProduct.quantity < quantityClient
            ) {
              results.push({
                success: false,
                statusCode: 400,
                message: "Vượt quá số lượng",
                data: [],
              });
            } else {
              results.push({
                success: false,
                statusCode: 400,
                message: "Hết hàng",
                data: [],
              });
            }
          } catch (error) {
            console.error("Error occurred:", error);
            // Xử lý lỗi nếu có
          }
        })
      );
    }
    console.log(results, "resuflt");
    const groupedResults = results.reduce((acc, curr) => {
      const key = curr.success ? "success" : "failure";
      if (!acc[key]) {
        acc[key] = curr;
      }
      return acc;
    }, {});

    // Chọn ra kết quả duy nhất từ mỗi nhóm
    return groupedResults.success || groupedResults.failure;
  } catch (error) {
    throw error;
  }
};

const deletedOrderItemServices = async (orderData) => {
  try {
    const { id, status, tableNumber, locationId } = orderData;
    // Kiểm tra xem có đơn hàng nào đã tồn tại với tableNumber và productId không
    const existingOrder = await Order.findOne({
      _id: id,
      status: { $nin: ["order_success", "order_deleted", "order_done"] },
    }).exec();
    if (existingOrder) {
      existingOrder.status = status;
      await existingOrder.save();
      const getAllOrderByTableNumber = await Order.find({
        tableNumber: tableNumber,
        locationId: locationId,
      })
        .populate("productId")
        .populate("locationId")
        .exec();
      return {
        success: true,
        statusCode: 200,
        message: "Xóa thành công",
        data: getAllOrderByTableNumber,
      };
    } else {
      // Nếu status là "order_success", trả về thông báo lỗi
      return {
        success: false,
        statusCode: 400,
        message: "Xóa thất bại kiểm tra lại",
        data: [],
      };
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
  updatePaymentForTableNumberService,
  deletedOrderItemServices,
  createNewMuptipleOrderServices,
};
