const workShiftModel = require("../models/Work_Shifts");

// @route POST /auth
// @access Public
const addWorkShift = async (req, res) => {
  const { nameWork, start_time, end_time } = req.body;
  if (!start_time || !end_time) {
    return res.status(400).json({ message: 'All fields are required', status: 400, data:[], success:false  })
}
 // Check for duplicate nameWork
 const duplicate = await workShiftModel.findOne({ nameWork }).lean().exec()

 if (duplicate) {
     return res.json({ message: 'nameLocation was existed', status: 400, data:[], success:false })
 }

 const newWorkShift = { nameWork, start_time, end_time }

 const workShiftObj = await workShiftModel.create(newWorkShift)

 if (workShiftObj) { //created 
     res.json({ message: `New workShift created`, status: 200, data:[], success: true } )
 } else {
     res.json({ message: 'Invalid workShift data received', status: 400, data:[], success:false })
 }
};


const getAllWorkShift = async (req, res) => {
    // Get all users from MongoDB
    const workShifts = await workShiftModel.find().exec()

    // If no users 
    if (!workShifts?.length) {
        return res.status(400).json({ message: 'Invalid workShifts data received', status: 400, data:[], success:false })
    }

    res.json({ message: `get all workShifts success`, status: 200, data: locations , success: true } )
}

const getWorkShiftByTime = async (dataTimeWorkShift) => {
const parseTimeLogin = new Date(dataTimeWorkShift)
    //dataTimeWorkShift : 12:30
    let parseTime = []
    const dataTime = await workShiftModel.find().exec()
    dataTime.forEach((doc) => {
        parseTime.push({
            id: doc._id,
            nameWork: doc.nameWork,
            start_time: new Date(doc.start_time).getHours(),
            end_time : new Date(doc.end_time).getHours() 
        })

      });
    //  const itemTimeFilter =  parseTime.filter((item,idx)=>item.start_time <= parseTimeLogin.getHours() && item.end_time >= parseTimeLogin.getHours())
     const output = parseTime.reduce((acc, doc) => {
      
            if(doc.start_time <= parseTimeLogin.getHours() && doc.end_time >= parseTimeLogin.getHours()) {
                acc = {
                    id: doc.id,
                    nameWork: doc.nameWork,
                    start_time: new Date(doc.start_time).toLocaleTimeString('vi-VN'),
                    end_time: new Date(doc.end_time).toLocaleTimeString('vi-VN'),
                  };
            }
        
        
        return acc;
      }, {});
    // 7:00 <= 11:30,
    // 12:00 >= 11:30,
    // If no users 

   return output
}


// @route DELETE /users
// @access Private
const deleteWorkShiftById = async (req, res) => {
    const { id } = req.body
    const workShifts = await workShiftModel.find().exec()
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'ID Required' })
    }

    // Does the location still have assigned notes?
    const workShiftDelete = await workShiftModel.findById(id).exec()
    if (!workShiftDelete) {
        return res.status(400).json({ message: 'check workShift and try to again', status: 400, data: [] , success: false })
    }

    const result = await workShiftDelete.deleteOne()

    if (!result) {
        return res.status(400).json({ message: 'some error when delete workShift ', status: 400, data: [] , success: false })
    }
    
    res.json({ message: `deleted workShift success`, status: 200, data: workShifts , success: true } )
}
    

module.exports = {
    addWorkShift,
    getAllWorkShift,
    deleteWorkShiftById,
    getWorkShiftByTime
};
