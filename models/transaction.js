import mongoose from "mongoose";
import Post from "./post";
import User from "./user";
import Bounty from "./bounty";

const transactionSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    spark: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    bounty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bounty",
    },
    typeOf: {
      type: String,
      required: true,
    },
    status: {
      type: "string",
      isIn: ["PENDING", "FAIL", "SUCCESS"],
      defaultsTo: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
