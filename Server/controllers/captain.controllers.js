import { validationResult } from "express-validator";
import { CaptainModel } from "../models/captainModel.js";
import { createCaptain as createCaptainService } from "../Services/captainServices.js";


export const createCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                status: "fail",
                errors: errors.array()
            });
        }
        
        const { fullname, email, password, location = "", status = "inactive", vehicles } = req.body;
        
        const hashedPassword = await CaptainModel.hashPassword(password);
        
        const captain = await createCaptainService({
            fullname,
            email,
            password: hashedPassword,
            location,
            status,
            vehicles
        });
        
        const token = captain.generateAuthToken();
        
        res.status(201).json({
            status: 'success',
            data: { token, captain }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const loginCaptain = async (req,res,next) =>{
    try {
        const {email , password} = req.body;
        
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ status:"fail", errors:errors.array()})
        }

        const captainUser = await CaptainModel.findOne({email}).select("+password");
        if(!captainUser){
            return res.status(404).json({message:"Invalid email or password"})
        }

        const checkPassword = await captainUser.comparePassword(password);
        
        if(!checkPassword){
            return res.status(404).json({message:"Invalid email or password"})
        }
        
        // Convert to plain object and remove password
        const captainData = captainUser.toObject();
        delete captainData.password;

        const token = captainUser.generateAuthToken();
        res.cookie('token', token, {
            httpOnly: true,
        });

        res.status(201).json({
            status: "Success",
            data: captainData,  // Send the cleaned data
            token
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            status: "fail",
            message: error
        });
    }
}

export const getcaptainProfile = async (req ,res ,next)=>{
    try {
       res.status(200).json(req.captain);
    } catch (error) {
       res.status(401).json({
               message:error   
           })
    }
   };