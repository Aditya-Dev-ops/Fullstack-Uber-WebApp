import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import { connectToDb } from './db/db.js';
import  userRouter  from './routes/userRoutes.js';

configDotenv();
export const app = express();
connectToDb();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

 app.get('/',(req,res)=>{
    console.log("Page load");
    res.send('Hello World');
 });

 // Mount the router
 app.use('/users', userRouter);

 app.use('*',(req,res)=>{
    res.status(404).json({
       status:"fail",
    });
 }); 