import mongoose from "mongoose";
const WebdataSchema = new mongoose.Schema(
  {
    title: String,
  },
  {
    timestamps: true,
  }
);

const WebData =
  mongoose.models.WebData || mongoose.model("WebData", WebdataSchema);

export default WebData;
