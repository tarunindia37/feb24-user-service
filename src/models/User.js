import mongoose, { Schema } from 'mongoose';
import { emailRegex } from '../constants.js';

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      minLength: 3,
    },
    last_name: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
      match: emailRegex,
    },
    mobile: {
      type: String,
      trim: true,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create Model (Class)
const User = mongoose.model('User', userSchema);

export default User;
