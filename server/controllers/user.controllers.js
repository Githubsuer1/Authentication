import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/user.models.js'
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utills/tokens.js';

dotenv.config({
    path:"../.env"
});

;
const userControll = {
    register:async (req,res)=>{
        try {
            // extracting data from body sent by front end
            const {username,email,password} = req.body;

            // checking for existing user, if exist send a already registered json response.
            const existingUser = await User.findOne({email});
            if(existingUser) return res.status(400).json({msg:"Email Already Registered "});

            // password length should be greater then 6
            if(password.length < 6) return res.status(400).json({msg:"Password length should be greater then 6"})

            //  creating hash password using bcrypt and creating a new user in database;
            const hashPassword = await bcrypt.hash(password,12);
            const user = await User.create({username,email,password:hashPassword});

            // creating accesstoken and refreshtoken for secure authentication 
            // const accesstoken = generateAccessToken(user._id,user.role);
            // const refreshtoken = generateRefreshToken(user._id);

            // setting refresh token as HTTP-only cookie
            // res.cookie('refreshtoken',refreshtoken,{
            //     httpOnly:true,
            //     secure: process.env.NODE_ENV === "production", // 
            //     sameSite:"Strict",
            //     path:'/api/v1/auth/refreshtoken',
            //     maxAge:7*24*60*60*1000
            // })

            // sending the response to front-end after successful signup
            res.status(200).json({msg:"User Registered Successfully"});
        } catch (error) {
            return res.status(500).json({msg:"Internal Server Error",error:error.message});
        }
    },
    login:async (req,res)=>{
        try {
            const {email,password} = req.body;

            // finding the user in user database using email field
            const findUser = await User.findOne({email});

            // matching password using bcrypt
            const isMatch = await bcrypt.compare(password,findUser.password);

            // checking if valid user is making request or not
            if (!findUser || !isMatch) {
                return res.status(400).json({ msg: "Invalid email or password" });
            }
            
            // generating access and refresh token
            const accesstoken = generateAccessToken(findUser._id,findUser.role);
            const refreshtoken = generateRefreshToken(findUser._id)

            // setting cookie as http only true
            res.cookie('refreshtoken',refreshtoken,{
                httpOnly:true,
                secure: process.env.NODE_ENV === "production",
                path:'/api/v1/auth/refreshtoken',
                sameSite:"Strict",
                maxAge:7*24*60*60*1000
            })

            // creating a safe user object to send only required information
            const safeUser = {
                _id:findUser._id,
                username:findUser.username,
                email:findUser.email,
                role:findUser.role
            }
            
            // sending the response to front end
            res.status(200).json({accesstoken,safeUser})

        } catch (error) {
            res.status(500).json({msg:"Internal server error",error:error.message});
        }
    },
    getUser:async (req,res)=>{
        try {
            console.log(req.user)
            if (!req.user || !req.user.id) {
                return res.status(401).json({ msg: "Unauthorized: No user found in request." });
            }
            const user = await User.findById(req.user.id).select('-password');
            if(!user) return res.status(404).json({msg:"User not found"});
            const userData = {
                _id: user._id,
                name: user.username,
                email: user.email,
                role: user.role  // Include role if authorization is required
            };
            res.json({user:userData});
        } catch (error) {
            res.status(500).json({ msg: "Server error. Please try again later." }); // Use 500 for internal errors
        }
    },
    logout:async(req,res)=>{
        try {
            res.clearCookie('refreshtoken',{
                path:'/api/v1/auth/refreshtoken',
            })

            res.status(200).json({msg:"Logout successfully"})
        } catch (error) {
            res.status(500).json({ msg: "Internal Server Error", error: error.message });
        }
    },
    refreshtoken:async(req,res)=>{
        try {
            // getting token from frontend 
            const token = req.cookies.refreshtoken;
            if (!token) return res.status(401).json({msg:"Please login again"});

            // vefifying token 
            jwt.verify(token,process.env.REFRESH_TOKEN_SECRET, async(error,decoded)=>{
                if(error) return res.status(403).json({msg:"Invalid or expired refresh token"});

            // fetching the user from User collection
            const user = await User.findById(decoded.id);
            if(!user) return res.status(404).json({msg:"User not found"});

            // generate access and refresh token
            const newAccessToken = generateAccessToken(user._id,user.role);

            // sending the response
            res.json({ accesstoken: newAccessToken });
        })
        } catch (error) {
            return res.status(500).json({ msg: "Internal server error", error: error.message });
        }
    }
}

export default userControll;