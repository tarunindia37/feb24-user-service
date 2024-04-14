import User from '../models/User.js';
import { uploadCloud } from '../utils/uploadCloud.js';
import {
  isEmailValid,
  isMobileValid,
  isNameValid,
} from '../utils/validator.js';

export const signup = async (req, res) => {
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
        //return res.status(500).json(new ApiError('Error uploading file', 500));
        return res.render('signUp', {
          isSuccess: false,
          isError: true,
          errorMsg: 'Failed to upload file',
        });
      }
    }
    try {
      const newUser = new User(user);
      const result = await newUser.save();
      const saveUser = result.toObject();
      delete saveUser.password;
      //res.status(201).json(saveUser);
      return res.render('signUp', {
        isSuccess: true,
        isError: false,
        errorMsg: '',
      });
    } catch (err) {
      console.error('Error in DB saving: ', err);
      //return res.status(500).json(new ApiError('Error in DB saving', 500));
      return res.render('signUp', {
        isSuccess: false,
        isError: true,
        errorMsg: 'Failed to save in DB',
      });
    }
  } else {
    // return res
    //   .status(400)
    //   .json(new ApiError('Data missing or validation failed', 400));
    return res.render('signUp', {
      isSuccess: false,
      isError: true,
      errorMsg: 'Validation Failed!!!',
    });
  }
};
