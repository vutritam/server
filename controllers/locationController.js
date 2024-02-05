const AuthenticationError = require("../config/authenticationError");
const locationService = require("../services/locationServices");

// @route POST /auth
// @access Public
const addLocationController = async (req, res) => {
    try {
        const listQrCode = await locationService.addLocationService(req.body);
    
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
}


const getAllLocationController = async (req, res) => {
    try {
        const listQrCode = await locationService.getAllLocationService();
    
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
}

const getLocationByIdController = async (req, res) => {
    try {
        const location = await locationService.getLocationByIdService(req.params.id);
    
        if (location) {
          const { status, success, message, data } = location
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
}

// @route DELETE /users
// @access Private
const deleteLocationByIdController = async (req, res) => {
    try {
        const { id } = req.params.id;
        const listQrCode = await locationService.deleteLocationByIdService(id);
    
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
}
    
module.exports = {
    addLocationController,
    getAllLocationController,
    deleteLocationByIdController,
    getLocationByIdController
};
