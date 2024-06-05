import mongoose from "mongoose";

export const connectDb = ()=>{
    try {
        mongoose.connect('mongodb+srv://arjuntech177:to49V6oovBgQIMsg@cluster0.oyup6gg.mongodb.net/');
        console.log("mongoDb connected");
    } catch (error) {
        console.log(error)
    }
}