import { CaptainModel } from "../models/captainModel.js";

export const createCaptain = async ({
    fullname,
    email,
    password,
    location,
    status,
    vehicles
}) => {
    // Add validation
    if (!fullname?.firstname || !email || !password || !vehicles?.color || !vehicles?.plate || !vehicles?.capacity || !vehicles?.vehicletype) {
        throw new Error('All required fields must be provided');
    }

    // Check if email already exists
    const existingCaptain = await CaptainModel.findOne({ email });
    if (existingCaptain) {
        throw new Error('Email already registered');
    }

    const captain = await CaptainModel.create({
        fullname,
        email,
        password,
        location,
        status,
        vehicles
    });

    return captain;
};