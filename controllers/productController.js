const productModel = require("../models/Products");
const { upload } = require("../middleware/verifyUploadFile");
// @desc getAllProducts
// @route POST /products
// @access Public
const multer = require("multer");
const getAllProduct = async (req, res) => {
  const product = await productModel.find();
  if (product) {
    return res
      .status(200)
      .json({ status: true, success: true, message: "", data: product });
  }
  return res.status(400).json({
    status: false,
    success: true,
    message: "Network and proplem when call data from server",
    data: [],
  });
};

// filter product
const getProductFilterByCondition = async (req, res) => {
  const { name, price, orther, condition, comparition, dateTime } = req.body;
  const priceConvert = Number(price)
  console.log(req.body, "req.body");
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
  console.log(conditions, "Object.keys(conditions).length");
  // Kiểm tra nếu không có điều kiện, tìm tất cả sản phẩm
  if (Object.keys(conditions).length === 0) {
    product = await productModel.find();
  } else {
    // Thực hiện tìm kiếm dựa trên điều kiện xây dựng
    product = await productModel.find(conditions).exec();
  }

  if (product) {
    return res.status(200).json({
      status: true,
      success: true,
      message: "",
      data: product,
    });
  } else {
    return res.status(400).json({
      status: false,
      success: false,
      message: "Network problem or error when fetching data from the server",
      data: [],
    });
  }
};

// @desc createProduct
// @route POST /products/add
// @access Public
const createProduct = async (req, res) => {
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
  } = req.body;

  // Confirm data
  if (!name || !price || !EndDate || !quantity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await productModel.findOne({ name }).lean().exec();

  if (duplicate) {
    return res.json({
      statuCode: 400,
      data: [],
      message: "Duplicate name product",
      success: false,
    });
  }

  console.log(req.file, "req.file");
  const imageName = req.file.originalname;

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
    res.json({
      statuCode: 200,
      data: [],
      message: "New product created",
      success: true,
    });
  } else {
    res.json({ statuCode: 400, data: [], message: "Failured", success: false });
  }
};

module.exports = {
  getAllProduct,
  createProduct,
  getProductFilterByCondition,
};
