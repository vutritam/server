const LikeModel = require("../models/Like");

//create new like
const createLikeOrDisLikeProduct = async (req, res) => {
    const { like, dislike, productId, tableNumber, location } = req.body
    const newLike = { like, dislike, productId, tableNumber, location };
    const likes = await LikeModel.findOne({ productId }).exec()
    console.log(likes,'likes');
    if(!!likes && likes.Like >= 1){
        return res.status(409).json('You already liked this product')
    }
    if(!tableNumber || !location || !productId) {
        return res.status(400).json({ message: `all field required`, status: 400, success: false } )
    }
    const orderUser = await LikeModel.create(newLike);
    if(orderUser) {
        return res.status(200).json({ message: `new like success`, status: 200, success: true } )
    }
    return res.status(400).json({ message: `error server`, status: 400, success: false } )
}

// get all like by productId
const getAllLikeOrDisLikeByProductId = async (req, res) => { 
    const { productId } = req.params
    const likes = await LikeModel.find({ productId }).exec()
    if(likes.length > 0){
        return res.status(200).json({ data : likes ,message:`get all like by Product Id Successful!`, status: true})
    }
    return res.status(400).json({ message: `error server`, status: 400, data:[], success: false } )
}

// get all like by productId
const getAllLikeAndDisLikeProduct = async (req, res) => { 
    const likes = await LikeModel.find().exec()
    if(likes.length > 0){
        return res.status(200).json({ data : likes ,message:`get all like by Product Id Successful!`, status: true})
    }
    return res.status(400).json({ message: `error server`, status: 400, data:[], success: false } )
}


// const updateLikeAndDisLikeProduct = async (req, res) => { 
//     const likes = await LikeModel.find().exec()
//     if(likes.length > 0){
//         return res.status(200).json({ data : likes ,message:`get all like by Product Id Successful!`, status: true})
//     }
//     return res.status(400).json({ message: `error server`, status: 400, data:[], success: false } )
// }

module.exports = {
  createLikeOrDisLikeProduct,
  getAllLikeOrDisLikeByProductId,
  getAllLikeAndDisLikeProduct
};
