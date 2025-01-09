import mongoose, { Schema } from "mongoose";
import Wallet from "./wallet";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: "",
    },
    referralCode: {
      type: String,
    },
    password: {
      type: String,
    },

    socialAccountType: {
      type: String,
      enum: ["CREDENTIAL", "GMAIL"],
      default: "CREDENTIAL",
    },

    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
