
const asyncHandler = require('express-async-handler')
const userServices = require('../services/userServices')


const getUserByIdController = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userServices.getUserByIdServices({ id });

        if (user) {
            return res.status(200).json({ success: true, data: user });
        }

        return res.status(400).json({ message: 'Invalid user data received' });
    } catch (error) {
        // Xử lý exception từ service
        console.error('Error in getUserByIdController:', error);

        // Trả về phản hồi lỗi chung
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            data: []
        });
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
        // Xử lý exception từ service
        console.error('Error in getAllUsersController:', error);

        // Trả về phản hồi lỗi chung
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            data: []
        });
    }
});


// @desc Create new user
// @route POST /users
// @access Private
const createNewUserController = asyncHandler(async (req, res) => {
    try {
        // Gọi service để tạo người dùng mới
        const result = await userServices.createNewUserServices(req.body);

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
        if(error) {
            res.status(error.code).json({
                success: false,
                message: error.name,
                data: []
            });
        }
        // Trả về phản hồi lỗi chung
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            data: []
        });
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
        console.error('Error in updateUserController:', error);

        // Trả về phản hồi lỗi chung
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            data: []
        });
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

        // Trả về phản hồi lỗi chung
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            data: []
        });
    }
});

module.exports = {
    getAllUsersController,
    createNewUserController,
    updateUserController,
    deleteUserController,
    getUserByIdController
}