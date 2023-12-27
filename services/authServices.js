const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthenticationError = require("../config/authenticationError");
// @desc Login
// @route POST /auth
// @access Public
const loginServices = async (authData) => {
  const { username, password } = authData;
  try {
    // Logic để lấy danh sách người dùng từ database
    if (!username || !password) {
      throw new AuthenticationError("Vui lòng điền đầy đủ thông tin", 400);
    }

    const foundUser = await User.findOne({ username }).exec();

    if (!foundUser || !foundUser.active) {
      throw new AuthenticationError(
        "Không tìm thấy tên tài khoản hoặc (không có quyền truy cập)",
        'username',
        401
      );
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      throw new AuthenticationError("Mật khẩu sai",'password', 400);
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: foundUser.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    return {
      accessToken,
      data: {
        username: foundUser.username,
        userId: foundUser.id,
        location: foundUser.location,
        roles: foundUser.roles,
      },
      success: true,
      message: "Đăng nhập thành công",
    };
  } catch (error) {
    // Handle specific exceptions
    console.error("Error in loginServices:", error);
    // Handle specific exceptions as needed
    throw error;
  }
};

module.exports = {
  loginServices,
};
