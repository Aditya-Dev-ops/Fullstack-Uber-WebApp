import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";


const captainSchema = new mongoose.Schema({
 fullname:{
    firstname:{
        type:String,
        minlength:[3 , "Firstname contains atleast three characters"] ,
         required:true
    },
    lastname:{
     type:String,
     required: true,
     minlength:[3 ,"Lastname must be at least three characters long "]
    }
  },
  email:{
    type:String,
    required: true,
    unique:true,
    lowercase:true,
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
    type:String,
    select:false,
    required:true
   },
 location:{
    lat:{
        type:Number
    },
    lng:{
        type: Number
    }
  },
  socketId:{
    type: String
  },
  status:{
    type:String,
    enum: ['active' , 'inactive'],
    default:'inactive'
  },
  vehicles: {
    color:{
        type:String,
        required:true,
        minlength: [3, "colour must be at least 3 characters long"],
    },
    plate:{
        type:String,
        required: true,
        minlength: [3 , "Plate must ba at least 3 characters long"]
    },
    capacity:{
       type:Number,
       required: true,
       min:[1 , 'Capacity must be at least 1'],         
    },
    vehicletype:{
        type: String,
        required: true,
        enum:['car','motorcycle','auto'],
    }
  }
 });

 captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
 }
 
 captainSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password)
 }

 captainSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password ,10);
 }

export const CaptainModel = mongoose.model('Captain', captainSchema);