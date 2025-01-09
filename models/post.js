import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    userId: String,
    tags: [{ code: String, name: String }],
    isProcessed: { type: Boolean, default: false },
    likeCount: { type: Number, default: 0 },
    isLiked: { type: Boolean, default: false },
    isDisliked: { type: Boolean, default: false },
    disLikeCount: { type: Number, default: 0 },
    isVoted: { type: Boolean, default: false },
    voteCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    tip: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
    image: String,
    status: {
      type: String,
      enum: ["PUBLIC", "INDRAFT", "INACTIVE"],  
      default: "PUBLIC",
    },
   
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
