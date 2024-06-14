import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
    adminId: {
        type: String,
        required: true
    },
    visitorsId: {
        type: Array
    }
})