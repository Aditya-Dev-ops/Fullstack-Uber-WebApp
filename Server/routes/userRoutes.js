import { Router } from "express";
import { body } from "express-validator";
import { registerUser } from "../controllers/user.controllers.js";
const userRouter = Router();

 userRouter.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3 })
         .withMessage('first name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage(
        'password at least have 6 characters long')
    ],
   registerUser
 )  



 export default userRouter;