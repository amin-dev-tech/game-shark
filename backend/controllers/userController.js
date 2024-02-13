// middleware imports
import asyncHandler from "../middleware/asyncHandler.js";

// model imports
import User from "../models/userModel.js";

// utils imports
import generateToken from "../utils/generateToken.js";

// @desc Auth user & get token
// @route POST api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register user
// @route POST api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalis user data");
  }
});

// @desc Logout user / clear cookie
// @route POST api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  // we set the jwt token to an empty string to clear the token
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// @desc Get user profile
// @route GET api/users/profil
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  // when user is authenticated, we have access to req.user
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user profile
// @route PUT api/users/profil
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // when user is authenticated, we have access to req.user
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    // this code will save new data to the variable
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get All users
// @route GET api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get all users");
});

// @desc Get users bu ID
// @route GET api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

// @desc Delete users
// @route DELETE api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

// @desc Update user by admin
// @route PUT api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  getUsers,
  deleteUser,
  loginUser,
  registerUser,
  logoutUser,
  getUserById,
  getUserProfile,
  updateUser,
  updateUserProfile,
};
