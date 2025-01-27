import { userModel } from "../models/usermodels.js";
import { createUser } from "../Services/userServices.js";
import { validationResult } from "express-validator";
// import { authUser } from "../middleware/authMiddleware.js";
import BlacklistToken from '../models/blacklistTokenModel.js';

 export const registerUser = async(req , res , next) => {
    try{ 
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
   console.log(user)
   const token = user.generateAuthToken();
   res.status(201).json({
    token , data:user
   }) 
}
catch(err){
    res.status(404).json({
        message:err.errmsg
    })
}
};

export const loginUser = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ status:"fail", errors:errors.array()})
        }
        
        const {password, email} = req.body;
        let user = await userModel.findOne({email}).select('+password');
        if(!user){
            return res.status(404).json({message:"Invalid email or password"})
        }
        
        const checkPassword = await user.comparePassword(password);
        if(!checkPassword){
            return res.status(404).json({message:"Invalid email or password"})
        }
        const updateduser = user.toObject();

        delete updateduser.password;
        const token = user.generateAuthToken();
        
        // Set cookie with expiration
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
        });

        res.status(201).json({
            status: "Success",
            data: updateduser,
            token
        });
    } catch(err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

export const getUserProfile = async (req ,res ,next)=>{
 try {
    res.status(200).json({
        data:req.user
    });
 } catch (error) {
    res.status(401).json({
            message:error   
        })
 }
};

export const getLogoutUser = async(req, res, next) => {
    try {
        // Add token to blacklist
        console.log("Run Logout" , req.token  , req.headers , "This is 93 line" , res.cookie )
       const data =  await BlacklistToken.create({ token: req.token || req.headers.authorization?.split(" ")[1] });
        // Clear the cookie
        console.log(data , "THis is 96 data");
        //  res.clearCookie('token');   
        res.status(200).json({
            status: "success",
            message: "Logged out successfully"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "fail",
            message: "Error during logout",
            error
        });
    } 
 }