import mongoose from "mongoose";
import Bounty from "./bounty";
import User from "./user";

const askSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bounty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bounty",
    },
    isDelete: { type: Boolean, default: false },
    answerCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["ACTIVE", "ONHOLD", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const Ask = mongoose.models.Ask || mongoose.model("Ask", askSchema);

export default Ask;
