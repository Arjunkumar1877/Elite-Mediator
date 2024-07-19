import mongoose from "mongoose";


const posterSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    }
})


export const PosterModel = mongoose.model('poster', posterSchema);