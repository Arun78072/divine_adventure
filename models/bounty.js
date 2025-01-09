import mongoose from "mongoose";
import Post from "./post";
import User from "./user";

const sparksSchema = new mongoose.Schema({
  spark: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const bountySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, default: 0 },
    isDelete: { type: Boolean, default: false },
    sparks: [sparksSchema],
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

const Bounty = mongoose.models.Bounty || mongoose.model("Bounty", bountySchema);

export default Bounty;
