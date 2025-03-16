import ConnectDB  from "./db/ConnectDB.js";
import app from "./app.js";
import dotenv from 'dotenv';
// dotenv
dotenv.config({});

// Connect to MongoDB
ConnectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port http://localhost:${process.env.PORT}`);
    });
}) 
.catch((error) => {
  console.log("Mongodb connection failed.", error);
});