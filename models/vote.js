import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vote = mongoose.models.Vote || mongoose.model("Vote", voteSchema);

export default Vote;
