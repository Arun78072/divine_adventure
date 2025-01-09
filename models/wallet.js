import mongoose from "mongoose";
import User from "./user";

const walletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "BLOCKED", "INACTIVE"],
      default: "ACTIVE",
    },

    amount: { type: Number, default: 0 },
    balanceOnHold: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);

export default Wallet;
