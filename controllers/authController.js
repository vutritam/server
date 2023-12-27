const AuthenticationError = require('../config/authenticationError');
const authServices = require('../services/authServices')

// @desc Login
// @route POST /auth
// @access Public
const loginController = async (req, res) => {
  try {
    const authData = await authServices.loginServices(req.body);
    if(authData) {
      const { accessToken, data, success, message } = authData;
      return res.json({ accessToken, data, success, message });
    }
   
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.json({
        success: false,
        statusCode: error.code,
        fieldError: error.fieldError,
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
  loginController,
};
