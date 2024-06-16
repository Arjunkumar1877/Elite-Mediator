import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    propId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "qrdata",
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

export const VisitorModel = mongoose.model("Visitor", visitorSchema);
