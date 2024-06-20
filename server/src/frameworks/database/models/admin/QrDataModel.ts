import mongoose from "mongoose";

const qrDataSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    propId: {
        type: String,
        required: true,
        unique: true
    },
    propertyName: {
        type: String,
        required: true
    },
    propertyAddress: {
        type: String,
        required: true
    },
    allowVedioCalls: {
        type: Boolean,
        required: true
    },
    userType: {
        type: String,
        enum: ['Verified', 'Unverified', 'Unknown']
    },
    url: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const QrModel = mongoose.model('QrModel', qrDataSchema);
