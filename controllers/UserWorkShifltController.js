const userWorkShiftModel = require("../models/UserWorkShift ");



const addUserWorkShift = async (req, res) => {
    const { user, location, shift } = req.body;
    if (!user || !user || !shift) {
        return res.status(400).json({ message: 'All fields are required', status: 400, data:[], success:false  })
    }

    const newUserWorkShift = { user, location, shift }

    const UserWorkShiftObj = await userWorkShiftModel.create(newUserWorkShift)

    if (UserWorkShiftObj) { //created 
        res.json({ message: `New workShift created`, status: 200, data:[], success: true } )
    } else {
        res.json({ message: 'Invalid workShift data received', status: 400, data:[], success:false })
    }
  };

// @route POST /auth
// @access Public
const getWorkShiftUserByUserIdAndLocationId = async (req, res) => {
  const { userId, locationId  } = req.body;
  if (!userId || !userId) {
    return res.status(400).json({ message: 'All fields are required', status: 400, data:[], success:false  })
}
 // Check for duplicate nameWork
 await userWorkShiftModel.find({ user: userId, location: locationId })
 .populate('shift') // Lấy thông tin về ca làm việc
 .populate('location') // Lấy thông tin về địa điểm làm việc
 .exec((err, userWorkShifts) => {
   if (err) {
     console.error(err);
     res.json({ message: 'Invalid workShift data received', status: 400, data:[], success:false })
     return;
   }
   res.json({ message: `New workShift created`, status: 200, data:userWorkShifts, success: true } )
   console.log(userWorkShifts);
 });

};


// @route POST /auth
// @access Public
const getWorkShiftUserByUserId= async (req, res) => {
    const {userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'userId fields are required', status: 400, data:[], success:false  })
  }
   // Check for duplicate nameWork
   await userWorkShiftModel.find({
    user: userId
  })
    .populate('shift') // Lấy thông tin về ca làm việc
    .populate('location') // Lấy thông tin về địa điểm làm việc
    .exec((err, userWorkShifts) => {
      if (err) {
        console.error(err);
        res.json({ message: 'Invalid workShift data received', status: 400, data:[], success:false })
        return;
      }
      console.log(userWorkShifts);
      return res.json({ message: `get workShift sucess`, status: 200, data: userWorkShifts, success: true } )
    });
   
  };


const getAllWorkShift= async (req, res) => {

   // Check for duplicate nameWork
    await userWorkShiftModel.find()
    .populate('shift') // Lấy thông tin về ca làm việc
    .populate('location') // Lấy thông tin về địa điểm làm việc
    .exec((err, userWorkShifts) => {
      if (err) {
        console.error(err);
        res.json({ message: 'Invalid workShift data received', status: 400, data:[], success:false })
        return;
      }
      console.log(userWorkShifts);
      return res.json({ message: `get workShift sucess`, status: 200, data: userWorkShifts, success: true } )
    });
   
  };

// @route DELETE /users
// @access Private
const deleteUserWorkShiftById = asyncHandler(async (req, res) => {
    const { id } = req.body
    const userWorkShifts = await userWorkShiftModel.find().exec()
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'ID Required' })
    }

    // Does the location still have assigned notes?
    const workShiftDelete = await userWorkShiftModel.findById(id).exec()
    if (!workShiftDelete) {
        return res.status(400).json({ message: 'check workShift and try to again', status: 400, data: [] , success: false })
    }

    const result = await workShiftDelete.deleteOne()

    if (!result) {
        return res.status(400).json({ message: 'some error when delete workShift ', status: 400, data: [] , success: false })
    }
    
    res.json({ message: `deleted workShift success`, status: 200, data: userWorkShifts , success: true } )
})
    

module.exports = {
    addUserWorkShift,
    getWorkShiftUserByUserIdAndLocationId,
    getWorkShiftUserByUserId,
    getAllWorkShift,
    deleteUserWorkShiftById
};
