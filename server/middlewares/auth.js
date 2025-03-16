import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({
    path:'../.env'
});


const auth = (req,res,next)=>{
    try {
        const authHeader = req.header('Authorization');
        // console.log(authHeader)
        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({msg:"Invalid authentication"});
        }
        const token = authHeader.split(" ")[1]
        // console.log(token);
        
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(error,decoded)=>{
            if (error) return res.status(400).json({ msg: "Invalid Authentications" });
            // console.log(decoded)
            // req.user = decoded;
            next();
        })
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Catches unexpected errors
    }
}

export default auth;