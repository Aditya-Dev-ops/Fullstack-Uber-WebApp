import { Router } from "express";
import { body } from "express-validator";
import { createCaptain, getcaptainProfile, loginCaptain } from "../controllers/captain.controllers.js";
import { authCaptain } from "../middleware/authMiddleware.js";

const captainRoutes = Router();

captainRoutes.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('first name must be at least 3 characters long'),
    body('fullname.lastname').isLength({min: 3}).withMessage('last name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('password must be at least 6 characters long'),
    body('vehicles.color').isLength({min: 3}).withMessage("Vehicle colour must be at least 3 characters"),
    body('vehicles.plate').isLength({min: 3}).withMessage("plate must be at least 3 characters"),
    body('vehicles.capacity').isInt({ min: 2 }).withMessage("capacity must be at least 2"),
    body('vehicles.vehicletype').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
    ], createCaptain);

captainRoutes.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('password must be at least 6 characters long'),
   ] , loginCaptain);

captainRoutes.get('/profile', authCaptain, getcaptainProfile);   

export default captainRoutes;