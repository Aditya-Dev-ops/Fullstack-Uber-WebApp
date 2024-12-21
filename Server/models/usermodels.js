import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { configDotenv } from "dotenv";
import bcrypt from 'bcrypt';

 configDotenv();
 const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
        type: String,
        required: true,
        minlength :[3 , 'first name must be at least 3 characters long'],
        maxlength : 10
    },
    lastname:{
        type: String,
        required: true,
        minlength :[3 , 'last name must be at least 3 characters long'],
        maxlength : 10
    }
  },
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: [5, 'Email must be at least five characters'],
    match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        'Please enter a valid email address'
    ],
    validate: {
        validator: function(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: 'Invalid email format'
    }
  },
  password:{
    type: String,
    required: true,
    select: false
  },
  socketId:{
    type:String
  }
 });

 userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }  // Token expires in 24 hours
    );
    return token;
 }

 userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
 };
 userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password,10)
 };

 export const userModel = mongoose.model('user' , userSchema);