const productModel = require("../models/Products");
const { upload } = require("../middleware/verifyUploadFile");
// @desc getAllProducts
// @route POST /products
// @access Public
const getAllProduct = async (req, res) => {
  const product = await productModel.find();
  if (product) {
    return res.status(200).json({ status: true, success: true, data: product });
  }
  return res.status(400).json({ status: false, success: true, data: [] });
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
    return res.json({ statuCode:400, data:[],  message: "Duplicate name product", success:false   });
  }


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
      file:imageName,
      position,
      viewer,
      status
    };

    // Create and store new user
    const product = await productModel.create(newProduct);
    if (product) {
        //created
        res.json({ statuCode:200, data:[], message:"New product created", success:true  });
      } else {
        res.json({ statuCode:400, data:[], message:"Failured", success:false  });
      }

};

module.exports = {
  getAllProduct,
  createProduct,
};
