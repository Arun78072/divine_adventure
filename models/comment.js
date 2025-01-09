import mongoose from "mongoose";
import User from "./user";
const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    commentId: {
      type: String,
    },
    like: [likeSchema],
    likeCount: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["POST", "BOUNTY", "ASK"],  
    },
  },
  {
    timestamps: true,
  }
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
