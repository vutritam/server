
const asyncHandler = require('express-async-handler')
const userServices = require('../services/userServices');
const AuthenticationError = require('../config/authenticationError');


const getUserByIdController = asyncHandler(async (req, res) => {
    try {
        const user = await userServices.getUserByIdServices(req.params.id);

        if (user) {
            return res.status(200).json({ success: true, data: user });
        }

        // return res.status(400).json({ message: 'Invalid user data received' });
    } catch (error) {
        // Xử lý exception từ service
        console.error('Error in getUserByIdController:', error);

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
});

const getAllUsersController = asyncHandler(async (req, res) => {
    try {
        // Get all users from MongoDB
        const users = await userServices.getAllUsersServices();

        // If no users
        if (!users?.length) {
            return res.status(400).json({ message: 'No users found' });
        }

        res.json(users);
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
});


// @desc Create new user
// @route POST /users
// @access Private
const createNewUserController = asyncHandler(async (req, res) => {
    try {
        // Gọi service để tạo người dùng mới
console.log(req.body,'res');

        const result = await userServices.createNewUserServices(req.body);
        // Kiểm tra kết quả từ service
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
});
const createNewAdminController = asyncHandler(async (req, res) => {
    try {
        // Gọi service để tạo người dùng mới

        const result = await userServices.createNewAdminServices(req.body);
        // Kiểm tra kết quả từ service
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
});


// @desc Update a user
// @route PATCH /users
// @access Private
const updateUserController = asyncHandler(async (req, res) => {
    try {
        // Gọi service để cập nhật thông tin người dùng
        const result = await userServices.updateUserServices(req.body);

        // Kiểm tra kết quả từ service
        if (result.success) {
            // Nếu thành công, trả về phản hồi thành công
            res.status(result.status).json({
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
});


// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUserController = asyncHandler(async (req, res) => {
    try {
        // Gọi service để xóa người dùng
        const result = await userServices.deleteUserServices(req.body);

        // Kiểm tra kết quả từ service
        if (result.success) {
            // Nếu thành công, trả về phản hồi thành công
            res.status(result.status).json({
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
        console.error('Error in deleteUserController:', error);
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
});

module.exports = {
    getAllUsersController,
    createNewUserController,
    updateUserController,
    deleteUserController,
    getUserByIdController,
    createNewAdminController
}