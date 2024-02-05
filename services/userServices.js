const User = require("../models/User");
const Note = require("../models/Note");
// const = require('express-async-handler')
const bcrypt = require("bcrypt");
const AuthenticationError = require("../config/authenticationError");

const getUserByIdServices = async (userData) => {
  try {
    // Logic để lấy danh sách người dùng từ database
    const userServices = await User.findById(userData).select("-password").populate("userRequestId").populate("locationId").exec();
    if (userServices) {
      return {
        success: true,
        message: ``,
        status: 200,
        data: userServices,
      };
    }
    throw new AuthenticationError("Không tìm thấy user nào", 400);
  } catch (error) {
    // Handle specific exceptions
    console.log(error,'error getUserByIdServices');
   throw error
  }
};

const getAllUsersServices = async () => {
  try {
    // Logic để lấy danh sách người dùng từ database
    const userServices = await User.find().select("-password").lean();
    if (userServices?.length > 0) {
      return userServices;
    }
    throw new AuthenticationError("Không tìm thấy user nào", 400);
  } catch (error) {
    // Handle specific exceptions
    throw error
  }
};

// @desc Create new user
// @route POST /users
// @access Private
const createNewUserServices = async (userData) => {
  const { username, password, locationId } = userData;

  try {
    // Check for required fields
    if (!username || !password || !locationId) {
      throw new AuthenticationError("All fields are required", 400);
    }
    
    // Check for duplicate username
    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate) {
      throw new AuthenticationError("Username already exists",'username', 400);
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    // Create and store new user
    const userObject = { username, locationId, password: hashedPwd };
    const user = await User.create(userObject);

    if (user) {
      return {
        success: true,
        message: `New user ${username} created`,
        status: 200,
        data: [],
      };
    } else {
      throw new AuthenticationError("Invalid user data received", 400);
    }
  } catch (error) {
    console.log(error,'eror');
    // Handle other exceptions
    throw error
  }
};


const createNewAdminServices = async (userData) => {
  const { username, password } = userData;
  try {
    // Check for required fields
    if (!username || !password ) {
      throw new AuthenticationError("All fields are required", 400);
    }
    
    // Check for duplicate username
    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate) {
      throw new AuthenticationError("Username already exists",'username', 400);
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    // Create and store new user
    const userObject = { username, roles: ["admin"], password: hashedPwd };
    const user = await User.create(userObject);

    if (user) {
      return {
        success: true,
        message: `New user ${username} created`,
        status: 200,
        data: [],
      };
    } else {
      throw new AuthenticationError("Invalid user data received", 400);
    }
  } catch (error) {
    console.log(error,'eror');
    // Handle other exceptions
    throw error
  }
};

const updatePasswordUserServices = async (userData)=>{

  const { _id, password, reNewPassword, newPassword} = userData;
  try {
    if (!password || !newPassword) {
      throw new AuthenticationError('Nhập đầy đủ trước khi cập nhật','password', 400);
    }

    const foundUser = await User.findOne({ _id: _id }).exec();
    if(!foundUser) {
      throw new AuthenticationError('không tìm thấy user', null, 400);
    }
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      throw new AuthenticationError('Mật khẩu không đúng','password', 400);
    }
    if(reNewPassword !== newPassword){
      throw new AuthenticationError('Mật khẩu nhập lại không khớp','reNewPassword', 400);
    }
    const newPasswordUser = {
      password :await bcrypt.hash(newPassword, 10),
    }
    const userUpdate = await User.findByIdAndUpdate(_id, newPasswordUser, {returnDocument: true}).exec();
    if(userUpdate) {
      return {
        success: true,
        message: `Cập nhật thành công`,
        status: 200,
        data: [],
      }
    }

  } catch (error) {
    console.log(error,'eror');
    // Handle other exceptions
    throw error
  }
}

const updateProfileUserServices = async (userData)=>{

  try {
  const { _id, username, email, address} = userData.body
    const imageName = userData?.file?.originalname || '';
    const newDataUser = {
      username,
      email,
      file: imageName,
      address,
    }
 
    const userUpdate = await User.findByIdAndUpdate(_id, newDataUser, {returnDocument: true}).exec();
      if(userUpdate) {
        return {
          success: true,
        message: `Cập nhật thành công`,
        status: 200,
        data: [],
        }
      }

  } catch (error) {
      console.log(error,'eror');
      // Handle other exceptions
      throw error
  }
}


// @desc Update a user
// @route PATCH /users
// @access Private
const updateUserServices = async (userData) => {
  const { id, username, roles, active, password } = userData;

  try {
    // Confirm data
    if (
      !id ||
      !username ||
      !Array.isArray(roles) ||
      !roles.length ||
      typeof active !== "boolean"
    ) {
      throw new AuthenticationError(
        "All fields except password are required",
        400
      );
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec();

    if (!user) {
      throw new AuthenticationError("User not found", 400);
    }

    // Check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec();

    // Allow updates to the original user
    if (duplicate && duplicate._id.toString() !== id) {
      throw new AuthenticationError("Duplicate username", 409);
    }

    user.username = username;
    user.roles = roles;
    user.active = active;

    if (password) {
      // Hash password
      user.password = await bcrypt.hash(password, 10); // salt rounds
    }

    const updatedUser = await user.save();

    return {
      success: true,
      message: `${updatedUser.username} updated`,
      status: 200,
      data: [],
    };
  } catch (error) {
    // Handle other exceptions
    if (error.name === "AuthenticationError") {
      return {
        success: false,
        message: error.message,
        status: error.code,
        data: [],
      };
    } else {
      return {
        success: false,
        message: "Internal Server Error",
        status: 500,
        data: [],
      };
    }
  }
};

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUserServices = async (userData) => {
  const { id } = userData;

  try {
    // Confirm data
    if (!id) {
      throw new AuthenticationError("User ID Required", 400);
    }

    // Does the user still have assigned notes?
    const note = await Note.findOne({ user: id }).lean().exec();
    if (note) {
      throw new AuthenticationError("User has assigned notes", 400);
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec();

    if (!user) {
      throw new AuthenticationError("User not found", 400);
    }

    const result = await user.deleteOne();

    const reply = `Username ${result.username} with ID ${result._id} deleted`;

    return { success: true, message: reply, status: 200, data: [] };
  } catch (error) {
    // Handle other exceptions
    if (error.name === "AuthenticationError") {
      return {
        success: false,
        message: error.message,
        status: error.code,
        data: [],
      };
    } else {
      return {
        success: false,
        message: "Internal Server Error",
        status: 500,
        data: [],
      };
    }
  }
};

module.exports = {
  getUserByIdServices,
  createNewUserServices,
  updateUserServices,
  deleteUserServices,
  getUserByIdServices,
  getAllUsersServices,
  createNewAdminServices,
  updateProfileUserServices,
  updatePasswordUserServices
};
