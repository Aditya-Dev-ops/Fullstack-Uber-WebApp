import { userModel } from "../models/usermodels.js";
import jwt from 'jsonwebtoken';
import BlacklistToken from '../models/blacklistTokenModel.js';
import { CaptainModel } from "../models/captainModel.js";

export const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: 'Unauthorized Access - No token provided'
            });
        }

        // Check if token is blacklisted
        const isTokenBlacklisted = await BlacklistToken.findOne({ token });
        if (isTokenBlacklisted) {
            return res.status(401).json({
                status: 'fail',
                message: 'Token has been invalidated'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: 'not found'
            });
        }
        
        req.user = user;
        req.token = token;
        next();
        
    } catch (err) {
        // Handle JWT expiration error specifically
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: "fail",
                message: 'Token has expired'
            });
        }
        
        return res.status(401).json({
            status: "fail",
            message: 'Invalid token'
        });
    }
};

export const authCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: 'Unauthorized Access - No token provided'
            });
        }

        // Check if token is blacklisted
        const isTokenBlacklisted = await BlacklistToken.findOne({ token });
        if (isTokenBlacklisted) {
            return res.status(401).json({
                status: 'fail',
                message: 'Token has been invalidated'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await CaptainModel.findById(decoded._id);
        
        if (!captain) {
            return res.status(404).json({
                status: "fail",
                message: 'Captain not found'
            });
        }
        
        req.captain = captain;
        req.token = token;
        next();
        
    } catch (err) {
        // Handle JWT expiration error specifically
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: "fail",
                message: 'Token has expired'
            });
        }
        
        return res.status(401).json({
            status: "fail",
            message: 'Invalid token'
        });
    }
}