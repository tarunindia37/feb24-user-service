import express from 'express';
import fs from 'fs';
import usersData from '../../db/users.json' assert { type: 'json' };
import route from './route.json' assert { type: 'json' };
import {
  isEmailValid,
  isMobileValid,
  isNameValid,
  isUrlValid,
} from '../utils/validator.js';
import ApiError from '../utils/ApiError.js';
import upload from '../utils/upload.js';
import uploadCloud from '../utils/uploadCloud.js';

const usersRoute = express.Router();

usersRoute
  .route(route.ROOT)
  .get((req, res) => {
    res.json(usersData);
  })
  .post(upload.single('avatar'), async (req, res) => {
    const { first_name, last_name, email, mobile, avatar } = req.body;
    if (
      first_name &&
      isNameValid(first_name) &&
      last_name &&
      isNameValid(last_name) &&
      email &&
      isEmailValid(email) &&
      mobile &&
      isMobileValid(mobile)
    ) {
      const id = usersData[usersData.length - 1].id + 1;
      const user = { id, first_name, last_name, email, mobile };
      if (avatar) {
        try {
          const cloudUrl = await uploadCloud(req.file.path);
          user.avatar = cloudUrl;
        } catch (error) {
          console.error('Error uploading file to Cloudinary: ', error);
          return res
            .status(500)
            .json(new ApiError('Error uploading file', 500));
        }
      }
      usersData.push(user);
      fs.writeFile('db/users.json', JSON.stringify(usersData), (err) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json(new ApiError('File operation failed', 500));
        }
        res.status(201).json(user);
      });
    } else {
      res
        .status(400)
        .json(new ApiError('Data missing or validation failed', 400));
    }
  });

// dynamic routes - PATH - /api/users/{userId}
usersRoute
  .route('/:userId')
  .get((req, res) => {
    const userId = +req.params.userId;
    const userData = usersData.find((user) => user.id === userId);
    if (userData && Object.keys(userData).length > 0) {
      res.json(userData);
    } else {
      res.status(404).json(new ApiError('User Not Found', 404));
    }
  })
  .delete((req, res) => {
    const userId = +req.params.userId;
    const userIndex = usersData.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
      usersData.splice(userIndex, 1);
      fs.writeFile('db/users.json', JSON.stringify(usersData), (err) => {
        if (err) {
          console.log(err);
          res.status(500).json(new ApiError('File operation failed', 500));
        }
        res.status(204).send();
      });
    } else {
      res.status(404).json(new ApiError('User Not Found', 404));
    }
  })
  .put((req, res) => {
    const { first_name, last_name, email, mobile, avatar } = req.body;
    const userId = +req.params.userId;
    const modifyUserData = {};

    if (first_name && isNameValid(first_name))
      modifyUserData.first_name = first_name;
    if (last_name && isNameValid(last_name))
      modifyUserData.last_name = last_name;
    if (email && isEmailValid(email)) modifyUserData.email = email;
    if (mobile && isMobileValid(mobile)) modifyUserData.mobile = mobile;
    if (avatar && isUrlValid(avatar)) modifyUserData.avatar = avatar;

    const userIndex = usersData.findIndex((user) => user.id === userId);

    if (userIndex !== -1 && Object.keys(modifyUserData).length > 0) {
      const updateUserData = { ...usersData[userIndex], ...modifyUserData };
      usersData[userIndex] = updateUserData;
      fs.writeFile('db/users.json', JSON.stringify(usersData), (err) => {
        if (err) {
          console.log(err);
          res.status(500).json(new ApiError('File operation failed', 500));
        }
        res.json(updateUserData);
      });
    } else {
      res.status(404).json(new ApiError('User Not Found', 404));
    }
  });

export default usersRoute;
