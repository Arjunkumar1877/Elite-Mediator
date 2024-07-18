"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QrModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const qrDataSchema = new mongoose_1.default.Schema({
    adminId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.QrModel = mongoose_1.default.model('QrModel', qrDataSchema);
