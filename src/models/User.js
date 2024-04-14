import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
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
    password: {
      type: String,
      required: true,
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

// Hash password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const hashedPassword = await bcrypt.hash(
    user.password,
    +process.env.HASH_SALT
  );
  user.password = hashedPassword;
  next();
});

// Create Model (Class)
const User = mongoose.model('User', userSchema);

export default User;
