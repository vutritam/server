const locationModel = require("../models/Location");
const AuthenticationError = require("../config/authenticationError");

// @route POST /auth
// @access Public
const addLocationService = async (locationData) => {
  try {
    const { nameLocation, quantityEmployee } = locationData;
    if (!nameLocation || !quantityEmployee) {
      throw new AuthenticationError("Vui lòng nhập đủ dữ liệu", 400);
    }
    // Check for duplicate nameLocation
    const duplicate = await locationModel
      .findOne({ nameLocation })
      .lean()
      .exec();

    if (duplicate) {
      throw new AuthenticationError("Địa điểm đã tồn tại", 400);
    }

    const newLocation = { nameLocation, quantityEmployee };

    const location = await locationModel.create(newLocation);

    if (location) {
      //created
      return {
        success: true,
        message: `Tạo thành công.`,
        status: 200,
        data: [],
      };
    } else {
      throw new AuthenticationError(
        "không thành công vui lòng thêm lại",
        400
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllLocationService = async () => {
  // Get all users from MongoDB
  try {
    const locations = await locationModel.find().exec();

    // If no data
    if (locations?.length > 0) {
     
      return {
        success: true,
        message: `Thành công.`,
        status: 200,
        data: locations,
      };
    }
    throw new AuthenticationError(
        "Có lỗi xảy ra vui lòng kiểm tra dữ liệu",
        400
      );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getLocationByIdService = async (id) => {
  // Get all users from MongoDB
  try {
    const location = await locationModel.findOne({_id: id}).exec();

    // If no data
    if (location) {
     
      return {
        success: true,
        message: `Thành công.`,
        status: 200,
        data: location,
      };
    }
    throw new AuthenticationError(
        `Không tìm thấy ${id}`,
        400
      );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// @route DELETE /users
// @access Private
const deleteLocationByIdService = async (id) => {
  try {
    // Confirm data
    if (!id) {
      throw new AuthenticationError("Vui lòng gửi đúng dữ liệu", 400);
    }

    // Does the location still have assigned notes?
    const locationDelete = await locationModel.findById(id).exec();
    if (!locationDelete) {
      throw new AuthenticationError("kiểm tra lại dữ liệu", 400);
    }

    const result = await locationDelete.deleteOne();

    if (!result) {
      throw new AuthenticationError("kiểm tra lại dữ liệu", 400);
    }
    return {
      success: true,
      message: `Thành công.`,
      status: 200,
      data: [],
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  addLocationService,
  getAllLocationService,
  deleteLocationByIdService,
  getLocationByIdService
};
