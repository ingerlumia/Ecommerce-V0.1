import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../Model/UserModel.js";
import sendMail from "../Middlewar/sendMail.js";
import crypto from "crypto";
import { log } from "console";
import { statusCode } from "../Middlewar/statusCode.js";
import { singleFileUpload } from "../Middlewar/multer.js";

dotenv.config();
const aCTIVATION_KEY = process.env.ACTIVATION_KEY;
const jwt_key = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, contact, addresses } = req.body;
    let avatar;
    let base_URL = process.env.REACT_APP_BACKEND_URL;
    if (process.env.NODE_ENV === "production") {
      base_URL = `${req.protocol}://${req.get("host")}`;
    }
    if (req.file) {
      avatar = `${base_URL}/uploads/${req.file.filename}`;
    }

    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXP_TIME * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    //Is User already in DataBase ???
    let user = await User.findOne({ email });

    if (user) {
      return res.status(statusCode.bad_Request).json({
        message: "User Already Exists",
      });
    }
    //Raw password to Hashed Password
    const hashpassword = await bcrypt.hash(password, 10);

    //Generate OTP
    const otp = Math.floor(Math.random() * 1000000);

    //Create New user
    user = { name, email, hashpassword, contact, avatar, addresses };

    //JWT Authentication
    const activation_Key = jwt.sign({ user, otp }, aCTIVATION_KEY, {
      expiresIn: "5m",
    });

    //Send Email To New user
    const message = `Please verify your account using otp your OTP is ${otp} `;

    await sendMail(email, "Welcome to sample-1", message);

    return res
      .status(statusCode.ok)
      .cookie("activation_Key", activation_Key, options)
      .json({
        message: `OTP send to your Gmail...${otp}`,
        activation_Key,
      });
  } catch (err) {
    return res.status(statusCode.server_Error).json({
      message: err.message,
      err,
    });
  }
};

//Verify OTP
export const verifyUser = async (req, res) => {
  try {
    const { otp } = req.body;
    const activation_Key = req.cookies.activation_Key;

    if (req.body.addresses) {
      return res.status(statusCode.not_Found).json({
        message: "Address Field Not There !!!",
      });
    }

    const verify = jwt.verify(activation_Key, process.env.ACTIVATION_KEY);

    if (!verify) {
      return res.status(statusCode.unAuthorized).json({
        message: "OTP Expired",
      });
    }

    if (verify.otp.toString().trim() !== otp.toString().trim()) {
      return res.status(statusCode.unAuthorized).json({
        message: "Incorrect OTP",
      });
    }

    await User.create({
      name: verify.user.name,
      email: verify.user.email,
      password: verify.user.hashpassword,
      contact: verify.user.contact,
      addresses: JSON.parse(verify.user.addresses),
      avatar: verify.user.avatar,
    });

    res.status(statusCode.ok).json({
      message: "User Registration Success",
    });
  } catch (err) {
    return res.status(statusCode.server_Error).json({
      message: err.message,
    });
  }
};

//Login User
export const loginUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    // For cookie expire option
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXP_TIME * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: false,
    };

    //check User email Adress
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(statusCode.bad_Request).json({
        message: "User Not Found",
      });
    }

    //Password Check

    const matchpassword = await bcrypt.compare(password.trim(), user.password);

    if (!matchpassword) {
      return res.status(statusCode.unAuthorized).json({
        message: "Invalid Password",
      });
    }

    //Signed token genarate
    const token = jwt.sign({ _id: user.id }, jwt_key, { expiresIn: "15d" });

    //exclude password before sending it
    const { password: userpassword, ...userDetails } = user.toObject();

    return res
      .status(statusCode.ok)
      .cookie("token", token, options)
      .json({
        message: `Welcome ${user.name}`,
        token,
        user: userDetails,
      });
  } catch (err) {
    return res.status(statusCode.server_Error).json({
      message: err.message,
    });
  }
};

// User Profile
export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(statusCode.ok).json({
      user,
    });
  } catch (err) {
    return res.status(statusCode.bad_Request).json({
      message: err.message,
    });
  }
};

//Forgot password
export const forgotPassword = async (req, res) => {
  //return token;
  let email = req.body.email;
  let base_URL = process.env.Frontend_URL;
  if (process.env.NODE_ENV === "production") {
    base_URL = `${req.protocol}://${req.get("host")}`;
  }
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(statusCode.bad_Request).json({
      message: "User Not Found",
    });
  }

  const resettoken = user.resetToken();
  //const resetToken = resetPasswordToken;
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${base_URL}/resetpassword/${resettoken}`;
  const msg = `Your Password restb URL : ${resetUrl}`;

  try {
    await sendMail(email, "message from sample-1", msg);

    res.status(statusCode.ok).json({
      message: `Password reset link sent to : ${email}`,
      resettoken,
    });
  } catch (err) {
    resetPasswordToken = undefined;
    resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(statusCode.server_Error).json({
      message: err.message,
    });
  }
};

//Reset Password
export const resetpassword = async (req, res) => {
  const { token } = req.params;

  try {
    //convert params String token to hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    // For cookie expire option
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXP_TIME * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
    };

    //Find user using converted hash value(Token) && Time Grater then stored time in MongoDB Atlas
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordTokenExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(statusCode.bad_Request).json({
        message: `invalid User`,
      });
    }

    if (req.body.password !== req.body.confirmpassword) {
      return res.status(statusCode.unAuthorized).json({
        message: `paaword error`,
      });
    }
    //Signed token genarate
    // const token = jwt.sign({ _id: user.id }, jwt_key, { expiresIn: "15d" });
    const hashpassword = await bcrypt.hash(req.body.password, 10);

    user.password = hashpassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(statusCode.ok).cookie("token", token, options).json({
      message: "Password reset Sucssfuly",
      user,
    });
  } catch (err) {
    return res.status(statusCode.server_Error).json({
      message: err.message,
    });
  }
};

//Change password
export const changepassword = async (req, res) => {
  try {
    //get user using given user
    const user = await User.findById(req.user.id).select("+password");

    //check old password
    const matchpassword = await bcrypt.compare(
      req.body.oldpassword,
      user.password,
    );

    if (!matchpassword) {
      return res.status(statusCode.unAuthorized).json({
        message: "Invalid Password",
      });
    }

    if (req.body.password != req.body.confirmpassword) {
      return res.status(statusCode.unAuthorized).json({
        message: "enter Password correctly",
      });
    }

    const hashpassword = await bcrypt.hash(req.body.password, 10); //change string password to hash password
    user.password = hashpassword;
    await user.save();

    return res.status(statusCode.ok).json({
      message: "Password changed successfully",
    });
  } catch (err) {
    return res.status(statusCode.server_Error).json({
      message: "Internal Server Error",
    });
  }
};

// Update profile informations ( User Name / Gmail )
export const updateProfile = async (req, res) => {
  try {
    let addresses = [];

    if (req.body.addresses) {
      addresses = JSON.parse(req.body.addresses);
    }
    let newUserData = {
      name: req.body.name,
      email: req.body.email,
      addresses,
    };

    let avatar;

    let base_URL = process.env.REACT_APP_BACKEND_URL;
    if (process.env.NODE_ENV === "production") {
      base_URL = `${req.protocol}://${req.get("host")}`;
    }
    if (req.file) {
      avatar = `${base_URL}/uploads/${req.file.filename}`;
      newUserData = { ...newUserData, avatar };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
    });

    return res.status(statusCode.ok).json({
      message: "Profile updated successfuly!!!",
      user,
    });
  } catch (err) {
    return res.status(statusCode.server_Error).json({
      message: "Internal server error",
    });
  }
};

//Admin : Get All User
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");

  if (!users) {
    return res.status(statusCode.bad_Request).json({
      message: "Users Not Found",
    });
  }

  res.status(statusCode.ok).json({
    message: `Founded Users ${users.length}`,
    users,
  });
};

//Admin : Get Specific User
export const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return res.status(statusCode.bad_Request).json({
      message: `User Not Found on this id ${req.params.id}`,
    });
  }
  res.status(statusCode.ok).json({
    message: "User Fetched",
    user,
  });
};

//Admin : Update User
export const updateUser = async (req, res) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      manager: req.body.managerEmail,
    };

    const user = await User.findByIdAndUpdate(req.params.id, userData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(statusCode.bad_Request).json({
        message: "User Id Error",
      });
    }

    res.status(statusCode.ok).json({
      message: "user Data Updated!!!",
      user,
    });
  } catch (err) {
    return res.status(statusCode.server_Error).json({
      message: "Something Went Wrong",
      err: err.message,
    });
  }
};

//Admin : Delete User
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(statusCode.bad_Request).json({
        message: "Users Not Found",
      });
    }

    res.status(statusCode.ok).json({
      message: `${req.params.id} user Deleted.`,
    });
  } catch (error) {
    return res.status(statusCode.server_Error).json({
      message: "Something went wrong",
      err: error.message,
    });
  }
};

//Manger : Get Specific User
export const getSpecificUser = async (req, res) => {
  const user = await User.findById(req.body.id).select("-password");

  if (!user) {
    return res.status(statusCode.bad_Request).json({
      message: `User Not Found on this id ${req.body.id}`,
    });
  }
  res.status(statusCode.ok).json({
    message: "User Fetched",
    user,
  });
};


