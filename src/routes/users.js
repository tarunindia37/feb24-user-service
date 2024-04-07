import express from 'express';
import route from './route.json' assert { type: 'json' };
import upload from '../utils/upload.js';
import {
  deleteUserById,
  getUserById,
  getUsers,
  setUser,
  updateUserById,
} from '../controllers/users.js';

const usersRoute = express.Router();

usersRoute
  .route(route.ROOT)
  .get(getUsers)
  .post(upload.single('avatar'), setUser);

// dynamic routes - PATH - /api/users/{userId}
usersRoute
  .route('/:userId')
  .get(getUserById)
  .delete(deleteUserById)
  .put(updateUserById);

export default usersRoute;
