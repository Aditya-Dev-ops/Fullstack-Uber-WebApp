import { Router } from "express";
import { body } from "express-validator";
import { getLogoutUser, getUserProfile, loginUser, registerUser } from "../controllers/user.controllers.js";
import { authUser } from "../middleware/authMiddleware.js";
const userRoutes = Router();

 userRoutes.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3 })
         .withMessage('first name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage(
        'password at least have 6 characters long')
    ],
   registerUser
 )  
 
 userRoutes.post('/login',[
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({min:6}).withMessage('Invalid Password')
 ],
  loginUser
)  

userRoutes.get('/profile',authUser , getUserProfile);

userRoutes.get('/logout',authUser,getLogoutUser);

export default userRoutes;