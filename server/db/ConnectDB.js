import mongoose from 'mongoose';
import DB_NAME from '../constant.js'
import dotenv from 'dotenv'

// loading .env file located in upper level
dotenv.config({
    path:'../.env'
})

const url = process.env.MONGODB_URI;
// console.log(url);

// mongodb connection using async and await 
const ConnectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${url}/${DB_NAME}`);
        console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB Connection Failed: ", error);
        process.exit(1);
    }
}


// exporting the connectDB function
export default ConnectDB;