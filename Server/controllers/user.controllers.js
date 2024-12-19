import { userModel } from "../models/usermodels.js";
import { createUser } from "../Services/userServices.js";
import { validationResult } from "express-validator";

export const registerUser = async(req , res , next) => {
   const errors = validationResult(req);

   if(!errors.isEmpty()){
    return res.status(400).json({
        status:"fail",
        errors:errors.array()
    })
 }  
   const { fullname:{firstname , lastname} , email  , password} = req.body;
   const hashedPassword = await userModel.hashPassword(password);
   const user = await createUser({
    firstname , lastname , email , password:hashedPassword
   }) 
   const token = user.generateAuthToken();
   res.status(201).json({
    token , user
   }) 
 };