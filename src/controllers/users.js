import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import { deleteFromCloud, uploadCloud } from '../utils/uploadCloud.js';
import {
  isEmailValid,
  isMobileValid,
  isNameValid,
  isUrlValid,
} from '../utils/validator.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    console.error('Error in DB: ', err);
    return res.status(500).json(new ApiError('Error in DB', 500));
  }
};

export const setUser = async (req, res) => {
  const { first_name, last_name, email, password, mobile, avatar } = req.body;
  if (
    first_name &&
    isNameValid(first_name) &&
    last_name &&
    isNameValid(last_name) &&
    email &&
    isEmailValid(email) &&
    password &&
    password.length >= 5 &&
    mobile &&
    isMobileValid(mobile)
  ) {
    const user = {
      first_name,
      last_name,
      email,
      mobile,
      password,
    };
    if (avatar) {
      try {
        const cloudUrl = await uploadCloud(req.file.path);
        user.avatar = cloudUrl;
      } catch (error) {
        console.error('Error uploading file to Cloudinary: ', error);
        return res.status(500).json(new ApiError('Error uploading file', 500));
      }
    }
    try {
      const newUser = new User(user);
      const result = await newUser.save();
      const saveUser = result.toObject();
      delete saveUser.password;
      res.status(201).json(saveUser);
    } catch (err) {
      console.error('Error in DB saving: ', err);
      return res.status(500).json(new ApiError('Error in DB saving', 500));
    }
  } else {
    res
      .status(400)
      .json(new ApiError('Data missing or validation failed', 400));
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    return user
      ? res.json(user)
      : res.status(404).json(new ApiError('User Not Found', 404));
  } catch (err) {
    console.error('Error in DB: ', err);
    return res.status(500).json(new ApiError('Error in DB', 500));
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    if (user?.avatar) {
      await deleteFromCloud(user.avatar);
    }
    return user
      ? res.status(204).send()
      : res.status(404).json(new ApiError('User Not Found', 404));
  } catch (err) {
    console.error('Error in DB: ', err);
    return res.status(500).json(new ApiError('Error in DB', 500));
  }
};

export const updateUserById = async (req, res) => {
  const userId = req.params.userId;
  const { first_name, last_name, email, mobile, avatar } = req.body;
  const modifyUserData = {};

  if (first_name && isNameValid(first_name))
    modifyUserData.first_name = first_name;
  if (last_name && isNameValid(last_name)) modifyUserData.last_name = last_name;
  if (email && isEmailValid(email)) modifyUserData.email = email;
  if (mobile && isMobileValid(mobile)) modifyUserData.mobile = mobile;
  if (avatar && isUrlValid(avatar)) modifyUserData.avatar = avatar;

  // TODO: Update avatar in cloudinary
  if (Object.keys(modifyUserData).length > 0) {
    try {
      const updateUser = await User.findByIdAndUpdate(userId, modifyUserData, {
        new: true,
      });
      return updateUser
        ? res.json(updateUser)
        : res.status(404).json(new ApiError('User Not Found', 404));
    } catch (err) {
      console.error('Error in DB: ', err);
      return res.status(500).json(new ApiError('Error in DB', 500));
    }
  } else {
    res.status(404).json(new ApiError('No Data to modify', 404));
  }
};

export const displayUsers = async (req, res) => {
  // Fetch the data from DB
  const users = await User.find({});
  // Generate the dynamic html
  res.render('users', { users });
};
