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
    const { status, success, message, data } = getAllProductOrder;
    if (getAllProductOrder) {
      return res.json({ message, status, data, success });
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
      const { message, status, data, success } = getAllProductOrder;
      return res.json({ message, status, data, success });
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
    if (getProductByLocationEmployee.length > 0) {
      return getProductByLocationEmployee;
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
      const { message, status, data, success } = getProductByLocationEmployee;
      return res.json({ message, status, data, success });
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
      const { message, status, data, success } = getProductByTable;
      return res.json({ message, status, data, success });
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
      const { message, status, data, success } = getAllOrderByUser;
      return res.status(200).json({ message, status, data, success });
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
    let getDataRoles = await OrderServices.getProductsByRoleServices(req.body);
    if (getDataRoles) {
      const { message, status, data, success } = getDataRoles;
      return res.status(200).json({ message, status, data, success });
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
      const { message, status, data, success } = deleteItem;
      return res.status(200).json({ message, status, data, success });
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
      return getProductByTable;
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

const handleDeleteAllOrderController = async (req, res) => {
  try {
    const getProductByTable =
      await OrderServices.handleDeleteAllOrderServices();
    if (getProductByTable) {
      const { message, status, data, success } = getProductByTable;
      return res.status(200).json({ message, status, data, success });
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
      const { message, status, data, success } = UpdateStatusOrder;
      return res.status(200).json({ message, status, data, success });
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
      return NewOrder;
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
