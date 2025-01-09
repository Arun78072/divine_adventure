import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    name: String,
    code: String,
  },
  {
    timestamps: true,
  }
);

const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);

export default Tag;
