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
    type:String,
    required: true,
    unique: true,
    minlength: [5, 'Email must be at least five characters']
  },
  password:{
    type: String,
    required: true,
    unique:true,
    select: false
  },
  socketId:{
    type:String
  }
});

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id} , process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function (password){
return await bcrypt.compare(password , this.password);
}

userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password,10)
}

export const userModel = mongoose.model('user' , userSchema);