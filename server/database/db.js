import mongoose from "mongoose";

export const connectDB =() => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "Library_Management_System"
    })
    .then(() => {
        console.log("Database connected successfully")
    }).catch(error => {
        console.error("Error in db connected");
    })
}