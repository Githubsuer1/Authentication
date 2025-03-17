import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();


// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const allowedOrigins = ['http://localhost:5173', 'https://authentication-phi-two.vercel.app/'];
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials:true
}));

// auth routes 
import authRouter from './routes/user.routes.js';
app.use("/api/v1/auth",authRouter);




export default app;