
const NotiModel = require("../models/Notification");

// @desc Login
// @route POST /auth
// @access Public
const getNotificationData = async (req, res) => {
  const { tableNumber, location } = req.body;
  let getNotiByUser = await NotiModel.find({
    tableNumber: Number(tableNumber),
    location: location
    // isPage: { $ne: 'employee_active' }
  }).sort({ dateTime: -1 }).populate('productId').exec();

  

  if (getNotiByUser.length > 0) {
    return res.json({ message: `Get notification success`, status: 200, data: getNotiByUser, success: true });
  }

  // Send accessToken containing username and roles
  return res.json({ message: `failure`, status: 400, data: [], success: false });
};


const handleDeleteAllNotification=async(req,res)=>{
  try {
      const result = await NotiModel.deleteMany({});
      if(result) {
          return res.status(200).json({ message: `Delete all success`, status: 200, success: true } )
      }
      return res.status(400).json({ message: `Can't delete all item`, status: 400, success: false } )
      // console.log(`Số bản ghi đã bị xóa: ${result.deletedCount}`);
    } catch (error) {
      console.error('Lỗi khi xóa bản ghi:', error);
    }
}

const getNotificationDataByUserRole = async(req, res)=>{
  const userId = req.params.id;
  const { location , isPage} = req.body;
  let getNotiByUser
  if(isPage === 'admin_page') {
    getNotiByUser =  await NotiModel.find({ isPage:'admin_page'}).sort({ dateTime: -1 }).populate('productId').populate('userId').populate('workShiftId').exec()
  }else {
    getNotiByUser =  await NotiModel.find({ location: location}).sort({ dateTime: -1 }).populate('productId').exec()
  //let arr =[]
  }
  // console.log(getNotiByUser,'getNotiByUser');
  if(getNotiByUser){
    return res.json({ message: `Get notification success`, status: 200, data: getNotiByUser, success: true });
  }
  // Send accessToken containing username and roles
  return res.json({ message: `failured`, status: 400, data: [], success: false});
}


const addNotificationDataByUserRole = async (dataMessage, message) => {
  let {tableNumber, location, productId, userId, isPage, workShiftId} = dataMessage;
  let dataMsg = {
    message: message,
    tableNumber:  tableNumber,
    location: location,
    productId: productId,
    userId: userId,
    isPage: isPage,
    workShiftId: workShiftId
  }
  const data = await NotiModel.create(dataMsg)
  let getNotiByUser
  if(isPage === 'admin_page' || userId !== null) {
    getNotiByUser =  await NotiModel.find({isPage: 'admin_page'}).sort({ dateTime: -1 }).populate('productId').populate('workShiftId').populate('userId').exec()
  }else {
    getNotiByUser =  await NotiModel.find().sort({ dateTime: -1 }).populate('productId').populate('workShiftId').populate('userId').exec()
  }
  
  if (data) { //created 
      return { isSuccess: true, data: getNotiByUser}
  } else {
      return { isSuccess: false, data: []}
  }
};

const getNotificationDataBySocket =async(dataLocation)=>{
 let getNotiByUser =  await NotiModel.find({ location: dataLocation}).sort({ dateTime: -1 }).populate('productId').exec()
 return getNotiByUser
}


const updateRecordNotification = async (req, res) => {
  let { checkSeen } = req.body;
  let updateValue = { $set: { checkSeen: checkSeen } };
  
  try {
    const result = await NotiModel.updateMany({}, updateValue);
    return res.json({ message: `${result.nModified} records updated`, status: 200, data: [], success: true });
  } catch (err) {
    return res.json({ message: err.message, status: 400, data: [], success: false });
  }
};

const updateRecordConfirmOrderNotification = async (idItem, data) => {
  const { status } = data
  try {
    const result = await NotiModel.findOneAndUpdate(
      { _id: idItem },
      { $set: { status: status } },
      { new: true }
    );
    const allRecords = await NotiModel.find()
    if (result && allRecords) { //updated 
      return allRecords
  } else {
      return []
  }
    // // Lấy tất cả các bản ghi sau khi đã cập nhật
    // const allRecords = await NotiModel.find();
    // if(result && allRecords) {
    //   return res.json({ message: `${result.nModified} records updated`, status: 200, data: allRecords, success: true });
    // }
   
  } catch (err) {
    return res.json({ message: err.message, status: 400, data: [], success: false });
  }
};


//POST NOTIFICATION 
const addNotificationData = async (dataMessage, message) => {
  let {tableNumber, location, productId, userId} = dataMessage;

  let dataMsg = {
    message: message,
    tableNumber:  tableNumber,
    location: location,
    productId: productId,
    userId: userId,
    isPage: 'user_order'
  }
  const data = await NotiModel.create(dataMsg)
  if (data) { //created 
      return true
  } else {
      return false
  }
};


module.exports = {
  getNotificationData,
  addNotificationData,
  addNotificationDataByUserRole,
  getNotificationDataByUserRole,
  handleDeleteAllNotification,
  updateRecordNotification,
  updateRecordConfirmOrderNotification,
  getNotificationDataBySocket
};