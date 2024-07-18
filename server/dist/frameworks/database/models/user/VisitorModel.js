"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const visitorSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    propId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "qrdata",
        required: true,
    },
    adminId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    }
}, { timestamps: true });
exports.VisitorModel = mongoose_1.default.model("Visitor", visitorSchema);
