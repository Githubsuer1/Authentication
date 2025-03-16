import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config({
    path:'../.env'
})


const generateAccessToken = (userId,role)=>{
    return jwt.sign({id:userId,role:role},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
} 


const generateRefreshToken = (userId)=>{
    return jwt.sign({id:userId},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"1d"});
} 

export {
    generateAccessToken,
    generateRefreshToken,
}