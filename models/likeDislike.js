import mongoose from "mongoose";

const like_dislikeSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Like', 'Dislike'],
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

const LikeDislike = mongoose.models.LikeDislike || mongoose.model("LikeDislike", like_dislikeSchema);

export default LikeDislike;
