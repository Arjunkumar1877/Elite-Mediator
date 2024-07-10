import mongoose from "mongoose";



export const connectDb = async()=>{
    try {
        const mongoUri = process?.env?.MONGO_URI;
        if(mongoUri){
            await  mongoose.connect(mongoUri);
            console.log("mongoDb connected");
        } else {
            console.log("No uri available")
        }
    } catch (error) {
        console.log(error)
    }
}