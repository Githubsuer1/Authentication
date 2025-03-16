import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();


// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cors({
    origin:"*",
    credentials:true
}));


// auth routes 
import authRouter from './routes/user.routes.js';
app.use("/api/v1/auth",authRouter);




export default app;