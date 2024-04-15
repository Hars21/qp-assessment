import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';

interface User {
    username: string;
    password: string;
    isAdmin: boolean;
  }
  
  const userSchema = new mongoose.Schema<User>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
  });
  
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  });
  
  export const UserModel = mongoose.model<User>('User', userSchema);
  