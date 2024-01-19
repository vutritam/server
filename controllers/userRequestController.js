
const asyncHandler = require('express-async-handler')
const userQuestServices = require('../services/userQuestServices');
const AuthenticationError = require('../config/authenticationError');



const updateIsChangeRequestUserController = asyncHandler(async (req, res) => {
    try {
        const result = await userQuestServices.updateIsChangeRequestUserServices(req.body);
        console.log(result,'adasd');
        if (result.success) {
          // Nếu thành công, trả về phản hồi thành công
          res.json({
              success: true,
              message: result.message,
              data: result.data
          });
      } else {
          // Nếu có lỗi, trả về phản hồi lỗi
          res.status(result.status).json({
              success: false,
              message: result.message,
              data: result.data
          });
      }
    } catch (error) {
        // Xử lý exception từ service
        console.error('Error in getUserByIdController:', error);

        if (error instanceof AuthenticationError) {
            return res.json({
              success: false,
              fieldError: error.fieldError,
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
});
const getAllRequestUserController = asyncHandler(async (req, res) => {
    try {
        const result = await userQuestServices.getAllRequestUserServices(req.body);
        if (result.success) {
          // Nếu thành công, trả về phản hồi thành công
          res.json({
              success: true,
              message: result.message,
              data: result.data
          });
      } else {
          // Nếu có lỗi, trả về phản hồi lỗi
          res.status(result.status).json({
              success: false,
              message: result.message,
              data: result.data
          });
      }
    } catch (error) {
        // Xử lý exception từ service
        console.error('Error in getAllRequestUserServices:', error);

        if (error instanceof AuthenticationError) {
            return res.json({
              success: false,
              fieldError: error.fieldError,
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
});
const approvedRequestForUserController = asyncHandler(async (req, res) => {
    try {
        const result = await userQuestServices.approvedRequestForUserServices(req.body);
        if (result.success) {
          // Nếu thành công, trả về phản hồi thành công
          res.json({
              success: true,
              message: result.message,
              data: result.data
          });
      } else {
          // Nếu có lỗi, trả về phản hồi lỗi
          res.status(result.status).json({
              success: false,
              message: result.message,
              data: result.data
          });
      }
    } catch (error) {
        // Xử lý exception từ service
        console.error('Error in getAllRequestUserServices:', error);

        if (error instanceof AuthenticationError) {
            return res.json({
              success: false,
              fieldError: error.fieldError,
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
});

module.exports = {
    updateIsChangeRequestUserController,
    getAllRequestUserController,
    approvedRequestForUserController
}