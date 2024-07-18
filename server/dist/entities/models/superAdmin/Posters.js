"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosterModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const posterSchema = new mongoose_1.default.Schema({
    imageUrl: {
        type: String,
        required: true
    }
});
exports.PosterModel = mongoose_1.default.model('poster', posterSchema);
