const AuthenticationError = require("../config/authenticationError");
const QRCodeSchema = require("../models/QrCode");

const getAllQrCodeServices = async () => {
  try {
    const findAllQrCode = await QRCodeSchema.find().populate("userId").populate("locationId").sort({ tableNumber: 1}).exec();
    if (findAllQrCode) {
      return {
        success: true,
        message: "Thành công",
        status: 200,
        data: findAllQrCode,
      };
    }

    throw new AuthenticationError(
      "Thất bại kiểm tra lại",
      400
    );
  } catch (error) {
    console.log(error, "eror");
    // Handle other exceptions
    throw error;
  }
};

const getAllQrCodeByIdLocationServices = async (id) => {
  try {

    const findAllQrCode = await QRCodeSchema.find({ locationId: id}).populate("userId").populate("locationId").sort({ tableNumber: 1}).exec();
    if (findAllQrCode) {
      return {
        success: true,
        message: "Thành công",
        status: 200,
        data: findAllQrCode,
      };
    }

    throw new AuthenticationError(
      "Thất bại kiểm tra lại",
      400
    );
  } catch (error) {
    console.log(error, "eror");
    // Handle other exceptions
    throw error;
  }
};

const addListQrCodeServices = async (qrCodeData) => {
    try {
      const promises = qrCodeData.map(async (item, index) => {
        await QRCodeSchema.findOneAndDelete({ tableNumber: item.tableNumber, locationId : item.location });
  
        // Item doesn't exist, create a new record
        const result = await QRCodeSchema.create(item);
  
        if (result) {
          return {
            success: true,
            message: `Tạo mới bàn số ${index} thành công.`,
            status: 200,
            data: [],
          };
        }
  
        throw new AuthenticationError(
          "Tạo mới không thành công vui lòng kiểm tra lại dữ liệu gửi đi.",
          400
        );
      });
  
      // Wait for all promises to resolve
      const results = await Promise.all(promises);
  
      const checkAddQrCode = results.some((item) => !item.success);
  
      if (!checkAddQrCode) {
        return {
          success: true,
          message: `Tạo mới thành công.`,
          status: 200,
          data: [],
        };
      }
  
      throw new AuthenticationError(
        "Không thành công vui lòng kiểm tra lại",
        400
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  };  

module.exports = {
  getAllQrCodeServices,
  addListQrCodeServices,
  getAllQrCodeByIdLocationServices
};
