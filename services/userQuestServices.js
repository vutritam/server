const UserRequest = require("../models/UserRequest");
const AuthenticationError = require("../config/authenticationError");
const User = require("../models/User");

const updateIsChangeRequestUserServices = async (userData) => {
  try {
    const { _id, isRequest, reason, location , status} = userData;
    const checkExisted = await UserRequest.findOne({ userId: _id });
    if (checkExisted) {
      checkExisted.reason = reason;
      checkExisted.isRequest = isRequest;
      checkExisted.location = location;
      checkExisted.status = status;
      const updateSuccess = await checkExisted.save();
      if (updateSuccess && isRequest !== "change_location") {
        return {
          success: true,
          message: "Hủy yêu cầu thành công",
          status: 200,
          data: [],
        };
      } else {
        return {
          success: true,
          message: "Gửi yêu cầu thành công",
          status: 200,
          data: [],
        };
      }
    } else {
      // Create and store new user
      const userObject = {
        userId: _id,
        isRequest: isRequest,
        reason: reason,
        location: location,
      };
      const newRequest = await UserRequest.create(userObject);
      if (newRequest) {
        const findByIdUser = await UserRequest.findOne({ userId: _id });
        if (findByIdUser) {
          const result = await User.findByIdAndUpdate(
            _id,
            { userRequestId: findByIdUser._id },
            { returnDocument: true }
          ).exec();
          if (result) {
            return {
              success: true,
              message: "Gửi yêu cầu thành công",
              status: 200,
              data: [],
            };
          } else {
            throw new AuthenticationError(
              "Gửi yêu cầu thất bại kiểm tra lại data",
              400
            );
          }
        }
        throw new AuthenticationError("Invalid user data received", 400);
      }
    }
  } catch (error) {
    console.log(error, "eror");
    // Handle other exceptions
    throw error;
  }
};
const getAllRequestUserServices = async () => {
  try {
    const findUser = await UserRequest.find().populate('userId').exec();
    if (findUser) {
      return {
        success: true,
        message: "Thành công",
        status: 200,
        data: findUser,
      };
    }

    throw new AuthenticationError(
      "Lấy tất cả yêu cầu thất bại kiểm tra lại",
      400
    );
  } catch (error) {
    console.log(error, "eror");
    // Handle other exceptions
    throw error;
  }
};
const approvedRequestForUserServices = async (userData) => {
    try {
        const { _id, status } = userData;
        const checkExisted = await UserRequest.findOne({ userId: _id });
        if (checkExisted) {
          checkExisted.status = status;
          const updateSuccess = await checkExisted.save();
          const userUpdate = await User.findByIdAndUpdate(_id, {location: checkExisted.location}, {returnDocument: true}).exec();
          if (updateSuccess && userUpdate) {
            return {
              success: true,
              message: "Đã chấp nhận yêu cầu này",
              status: 200,
              data: [],
            };
          } 
          throw new AuthenticationError("Invalid user data received", 400);
        } 
        throw new AuthenticationError("Invalid user data received", 400);    
      } catch (error) {
        console.log(error, "eror");
        // Handle other exceptions
        throw error;
      }
};

module.exports = {
  updateIsChangeRequestUserServices,
  getAllRequestUserServices,
  approvedRequestForUserServices
};
