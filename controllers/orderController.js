const AuthenticationError = require("../config/authenticationError");
const OrderServices = require("../services/orderServices");

///
// 1- id bàn
// 2- vị trí
// 3- sản phẩm

// /order/getProductByLocationEmployee/1

const getAllOrderController = async (req, res) => {
  try {
    const getAllProductOrder = await OrderServices.getAllOrderServices();
    const { statusCode, success, message, data } = getAllProductOrder;
    if (getAllProductOrder) {
      return res.json({ message, statusCode, data, success });
    }
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.json({
        success: false,
        statusCode: error.code,
        message: error.message,
        data: [],
      });
    } else {
      return res.json({
        success: false,
        statusCode: error.code,
        message: "Internal Server Error",
        data: [],
      });
    }
  }
};

const getAllOrderByLocationController = async (req, res) => {
  try {
    const getAllProductOrder =
      await OrderServices.getAllOrderByLocationServices(req.body);
    if (getAllProductOrder) {
      const { message, statusCode, data, success } = getAllProductOrder;
      return res.json({ message, statusCode, data, success });
    }
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.json({
        success: false,
        statusCode: error.code,
        message: error.message,
        data: [],
      });
    } else {
      return res.json({
        success: false,
        statusCode: error.code,
        message: "Internal Server Error",
        data: [],
      });
    }
  }
};

const getAllByLocationSocketController = async (data) => {
  try {
    const getProductByLocationEmployee =
      await OrderServices.getAllByLocationSocketServices(data);
    if (getProductByLocationEmployee) {
      return {
        success: getProductByLocationEmployee.message,
        statusCode: getProductByLocationEmployee.statusCode,
        message: getProductByLocationEmployee.message,
        data: getProductByLocationEmployee.data,
      };
    }
    return [];
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.json({
        success: false,
        statusCode: error.code,
        message: error.message,
        data: [],
      });
    } else {
      return res.json({
        success: false,
        statusCode: error.code,
        message: "Internal Server Error",
        data: [],
      });
    }
  }
};

const getAllOrderByNumberTableController = async (req, res) => {
  try {
    const getProductByLocationEmployee =
      await OrderServices.getAllOrderByNumberTableServices(req.body);
    if (getProductByLocationEmployee) {
      const { message, statusCode, data, success } = getProductByLocationEmployee;
      return res.json({ message, statusCode, data, success });
    }
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.json({
        success: false,
        statusCode: error.code,
        message: error.message,
        data: [],
      });
    } else {
      return res.json({
        success: false,
        statusCode: error.code,
        message: "Internal Server Error",
        data: [],
      });
    }
  }
};

const getAllOrderByNumberTableAndLocationUserController = async (req, res) => {
  try {
    const getProductByTable =
      await OrderServices.getAllOrderByNumberTableAndLocationUserServices(
        req.body
      );
    if (getProductByTable) {
      const { message, statusCode, data, success } = getProductByTable;
      return res.json({ message, statusCode, data, success });
    }
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.json({
        success: false,
        statusCode: error.code,
        message: error.message,
        data: [],
      });
    } else {
      return res.json({
        success: false,
        statusCode: error.code,
        message: "Internal Server Error",
        data: [],
      });
    }
  }
};
const getAllOrderByUserController = async (req, res) => {
  try {
    const getAllOrderByUser = await OrderServices.getAllOrderByUserServices();
    if (getAllOrderByUser) {
      const { message, statusCode, data, success } = getAllOrderByUser;
      return res.status(200).json({ message, statusCode, data, success });
    }
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.json({
        success: false,
        statusCode: error.code,
        message: error.message,
        data: [],
      });
    } else {
      return res.json({
        success: false,
        statusCode: error.code,
        message: "Internal Server Error",
        data: [],
      });
    }
  }
};

const getProductsByRoleController = async (req, res) => {
  try {
    console.log(req.body,'req.body');
    let getDataRoles = await OrderServices.getProductsByRoleServices(req.body);
    if (getDataRoles) {
      const { message, statusCode, data, success } = getDataRoles;
      return res.status(200).json({ message, statusCode, data, success });
    }
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.json({
        success: false,
        statusCode: error.code,
        message: error.message,
        data: [],
      });
    } else {
      return res.json({
        success: false,
        statusCode: error.code,
        message: "Internal Server Error",
        data: [],
      });
    }
  }
};

const deleteOrderController = async (req, res) => {
  try {
    const deleteItem = await OrderServices.deleteOrderServices(req.body);
    if (deleteItem) {
      const { message, statusCode, data, success } = deleteItem;
      return res.status(200).json({ message, statusCode, data, success });
    }
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.json({
        success: false,
        statusCode: error.code,
        message: error.message,
        data: [],
      });
    } else {
      return res.json({
        success: false,
        statusCode: error.code,
        message: "Internal Server Error",
        data: [],
      });
    }
  }
};

const getAllOrderByLocationSocketController = async (tableNumber, location) => {
  try {
    const getProductByTable =
      await OrderServices.getAllOrderByLocationSocketServices(
        tableNumber,
        location
      );
    if (getProductByTable) {
      return {
        success: getProductByTable.success,
        statusCode: getProductByTable.statusCode,
        message: getProductByTable.message,
        data: getProductByTable.data,
      };
    }
  } catch (error) {
    console.log(error, 'lỗi tại getAllOrderByLocationSocketController');
  }
};

const handleDeleteAllOrderController = async (req, res) => {
  try {
    const getProductByTable =
      await OrderServices.handleDeleteAllOrderServices();
    if (getProductByTable) {
      const { message, statusCode, data, success } = getProductByTable;
      return res.status(200).json({ message, statusCode, data, success });
    }
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.json({
        success: false,
        statusCode: error.code,
        message: error.message,
        data: [],
      });
    } else {
      return res.json({
        success: false,
        statusCode: error.code,
        message: "Internal Server Error",
        data: [],
      });
    }
  }
};

const handleUpdateStatusOrderController = async (req, res) => {
  try {
    const orderId = req.params.id;
    const UpdateStatusOrder =
      await OrderServices.handleUpdateStatusOrderServices(req.body, orderId);
    if (UpdateStatusOrder) {
      const { message, statusCode, data, success } = UpdateStatusOrder;
      return res.status(200).json({ message, statusCode, data, success });
    }
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.json({
        success: false,
        statusCode: error.code,
        message: error.message,
        data: [],
      });
    } else {
      return res.json({
        success: false,
        statusCode: error.code,
        message: "Internal Server Error",
        data: [],
      });
    }
  }
};

const createNewOrderController = async (data) => {
  try {
    const NewOrder = await OrderServices.createNewOrderServices(data);
    if (NewOrder) {
      return {
        success: NewOrder.success,
        statusCode: NewOrder.statusCode,
        message: NewOrder.message,
        data: NewOrder.data,
      };
    }
  } catch (error) {
    console.log(error, "error at createNewOrderController");
  }
};

module.exports = {
  getAllByLocationSocketController,
  createNewOrderController,
  getAllOrderByLocationController,
  getAllOrderController,
  getAllOrderByNumberTableController,
  getAllOrderByUserController,
  deleteOrderController,
  handleDeleteAllOrderController,
  handleUpdateStatusOrderController,
  getProductsByRoleController,
  getAllOrderByLocationSocketController,
  getAllOrderByNumberTableAndLocationUserController,
};
