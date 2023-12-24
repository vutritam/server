const AuthenticationError = require("../config/authenticationError");
const productServices = require("../services/productServices");

// @desc getAllProducts
// @route POST /products
// @access Public
const getAllProductController = async (req, res) => {
  try {
    const products = await productServices.getAllProductServices();

    if (products) {
      const { status, success, message, data } = products
      return res
        .json({ status ,success, message, data });
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
        message: 'Internal Server Error',
        data: [],
      });
    }
  }
};

// filter product
const getProductFilterByConditionController = async (req, res) => {
  try {
    const products = await productServices.getProductFilterByConditionServices(req.body);
    if (products) {
      const { status, success, message, data } = products
      return res
        .status(200)
        .json({ status, success, message, data });
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
        message: 'Internal Server Error',
        data: [],
      });
    }
  }
};

// @desc createProduct
// @route POST /products/add
// @access Public
const createProductController = async (req, res) => {
  try {
    const products = await productServices.createProductServices(req);
    if (products) {
      const { statusCode, success, message, data } = products
      return res
        .json({ statusCode, success, message, data });
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
        message: 'Internal Server Error',
        data: [],
      });
    }
  }
  
};

module.exports = {
  getAllProductController,
  createProductController,
  getProductFilterByConditionController,
};
