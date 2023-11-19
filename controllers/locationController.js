const locationModel = require("../models/Location");

// @route POST /auth
// @access Public
const addLocation = async (req, res) => {
  const { nameLocation, address } = req.body;
  if (!nameLocation || !address) {
    return res.status(400).json({ message: 'All fields are required', status: 400, data:[], success:false  })
}
 // Check for duplicate nameLocation
 const duplicate = await locationModel.findOne({ nameLocation }).lean().exec()

 if (duplicate) {
     return res.json({ message: 'nameLocation was existed', status: 400, data:[], success:false })
 }

 const newLocation = { nameLocation, address }

 const location = await locationModel.create(newLocation)

 if (location) { //created 
     res.json({ message: `New location created`, status: 200, data:[], success: true } )
 } else {
     res.json({ message: 'Invalid location data received', status: 400, data:[], success:false })
 }
};


const getAllLocation = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const locations = await locationModel.find().exec()

    // If no users 
    if (!locations?.length) {
        return res.status(400).json({ message: 'Invalid location data received', status: 400, data:[], success:false })
    }

    res.json({ message: `get all location success`, status: 200, data: locations , success: true } )
})

// @route DELETE /users
// @access Private
const deleteLocationById = asyncHandler(async (req, res) => {
    const { id } = req.body
    const locations = await locationModel.find().exec()
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'ID Required' })
    }

    // Does the location still have assigned notes?
    const locationDelete = await locationModel.findById(id).exec()
    if (!locationDelete) {
        return res.status(400).json({ message: 'check location again', status: 400, data: [] , success: false })
    }

    const result = await locationDelete.deleteOne()

    if (!result) {
        return res.status(400).json({ message: 'check location again', status: 400, data: [] , success: false })
    }
    
    res.json({ message: `deleted location success`, status: 200, data: locations , success: true } )
})
    

module.exports = {
    addLocation,
    getAllLocation,
    deleteLocationById
};
