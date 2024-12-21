import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectToDb } from './db/db.js';
import  userRoutes  from './routes/userRoutes.js';
import captainRoutes  from './routes/captainRoutes.js';

configDotenv();
export const app = express();
connectToDb();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    console.log("Page load");
    res.send('Hello World');
});

// Mount the router
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

app.use('*',(req,res)=>{
    res.status(404).json({
       status:"fail",
    });
}); 