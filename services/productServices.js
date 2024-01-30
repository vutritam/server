const productModel = require("../models/Products");
const AuthenticationError = require("../config/authenticationError");

// @desc getAllProducts
// @route POST /products
// @access Public
const getAllProductServices = async () => {
  try {
    const product = await productModel.find();
    if (product) {
      return { status: true, success: true, message: "", data: product };
    }
    throw new AuthenticationError("Không tìm thấy sản phẩm nào", 400);
  } catch (error) {
    throw error;
  }
};

// get product by id service
const getProductByIdService = async (productData) => {
  try {
    const product = await productModel.findById(productData);
    if (product) {
      return { status: true, success: true, message: "", data: product };
    }
    throw new AuthenticationError("Không tìm thấy sản phẩm nào", 400);
  } catch (error) {
    throw error;
  }
};

// filter product
const getProductFilterByConditionServices = async (productData) => {
  const { name, price, orther, condition, comparition, dateTime } = productData;

  try {
    const priceConvert = Number(price);
    const conditions = {};
    let product;

    if (name && name !== "all") {
      conditions.name = name;
    }

    if (orther && orther !== "all") {
      conditions.orther = orther;
    }

    if (price && price !== "all") {
      conditions.price = priceConvert;
    }

    // Xử lý điều kiện logic (condition)
    if (condition === "or") {
      conditions.$or = [];
      if (name && name !== "all") {
        conditions.$or.push({ name: name });
      }
      if (orther && orther !== "all") {
        conditions.$or.push({ orther: orther });
      }
    } else {
      conditions.$and = [];
      if (name && name !== "all") {
        conditions.$and.push({ name: name });
      }
      if (orther && orther !== "all") {
        conditions.$and.push({ orther: orther });
      }
    }

    // Xử lý toán tử so sánh (comparition)
    if (comparition === ">") {
      if (price && price !== "all") {
        conditions.price = { $gt: priceConvert };
      }
    } else if (comparition === "<") {
      if (price && price !== "all") {
        conditions.price = { $lt: priceConvert };
      }
    }
    // Kiểm tra nếu không có điều kiện, tìm tất cả sản phẩm
    if (Object.keys(conditions).length === 0) {
      product = await productModel.find();
    } else {
      // Thực hiện tìm kiếm dựa trên điều kiện xây dựng
      product = await productModel.find(conditions).exec();
    }

    if (product) {
      return {
        status: true,
        success: true,
        message: "",
        data: product,
      };
    } else {
      throw new AuthenticationError("Không tìm thấy sản phẩm nào", 400);
    }
  } catch (error) {
    // Handle specific exceptions
    console.error("Error in loginServices:", error);
    // Handle specific exceptions as needed
    throw error;
  }
};

// @desc createProduct
// @route POST /products/add
// @access Public
const createProductServices = async (productData) => {
  const {
    name,
    price,
    StartDate,
    Description,
    EndDate,
    quantity,
    user,
    viewer,
    position,
    status,
  } = productData.body;
  try {
    // Confirm data
    if (!name || !price || !EndDate || !quantity) {
      throw new AuthenticationError("Vui lòng điền đầy đủ thông tin!", 400);
    }

    // Check for duplicate username
    const duplicate = await productModel.findOne({ name }).lean().exec();

    if (duplicate) {
      throw new AuthenticationError("Tên sản phẩm đã tổn tại", 400);
    }

    const imageName = productData.file.originalname;

    // Tiếp tục xử lý tạo sản phẩm

    const newProduct = {
      name,
      price,
      StartDate,
      Description,
      EndDate,
      quantity,
      user,
      file: imageName,
      position,
      viewer,
      status,
    };

    // Create and store new user
    const product = await productModel.create(newProduct);
    if (product) {
      //created
      return {
        statusCode: 200,
        data: [],
        message: "New product created",
        success: true,
      };
    } else {
      throw new AuthenticationError("Thất bại", 400);
    }
  } catch (error) {
    // Handle specific exceptions
    console.error("Error in loginServices:", error);
    // Handle specific exceptions as needed
    throw error;
  }
};

module.exports = {
  getAllProductServices,
  createProductServices,
  getProductFilterByConditionServices,
  getProductByIdService
};
