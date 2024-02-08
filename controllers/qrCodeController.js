const AuthenticationError = require("../config/authenticationError");
const qrCodeServices = require("../services/qrCodeServices");

// @desc getAllProducts
// @route POST /products
// @access Public
const getAllQrCodeController = async (req, res) => {
  try {
    const listQrCode = await qrCodeServices.getAllQrCodeServices();

    if (listQrCode) {
      const { status, success, message, data } = listQrCode
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

const getAllQrCodeByIdLocationController = async (req, res) => {
  try {
    const listQrCode = await qrCodeServices.getAllQrCodeByIdLocationServices(req.params.id);

    if (listQrCode) {
      const { status, success, message, data } = listQrCode
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

const addListQrCodeByLocationController = async (req, res) => {
  try {
    const listQrCode = await qrCodeServices.addListQrCodeServices(req.body);

    if (listQrCode) {
      const { status, success, message, data } = listQrCode
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

module.exports = {
    getAllQrCodeController,
    addListQrCodeByLocationController,
    getAllQrCodeByIdLocationController
};
