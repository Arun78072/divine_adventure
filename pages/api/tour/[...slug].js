import checkAuth from "../middleware/checkAuth";
import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/post";
import User from "@/models/user";
import LikeDislike from "@/models/likeDislike";
import Vote from "@/models/vote";
import Comment from "@/models/comment";
import Tour from "@/models/tour";

export default async function handler(req, res) {
  await checkAuth(req, res);
  await connectMongoDB();
  const { slug } = req.query;
  if (slug[0] === "my_sparks") {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const posts = await Post.find({
        userId: req.user.id,
        deleted: false,
      });
      res.status(200).json({
        status: 200,
        message: "Topics fetched successfully",
        data: posts,
      });
    } catch (error) {
      console.error("Error fetching topics:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while fetching topics" });
    }
  } else if (slug[0] === "spark") {
    try {
      const { sparkId } = req.query;
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const userId = req.user.id;
      const posts = await Post.findOne({
        _id: sparkId,
        deleted: false,
      });

      if (!posts._id) {
        res.status(404).json({ error: "Invalid Spark Id" });
      }
      const userData = await User.findOne({ _id: posts.userId });
      const findLikeCount = await LikeDislike.find({
        postId: sparkId,
      });

      const findVotes = await Vote.find({ postId: sparkId });
      const findComments = await Comment.find({ postId: sparkId }).populate(
        "user"
      );
      const updatedComments = findComments.map((comment) => ({
        ...comment.toObject(),
        isLiked: comment.like.some((li) => li.user.toString() === userId),
      }));

      // posts.likeCount =
      //   findLikeCount.filter((item) => item.type === "Like").length || 0;
      // posts.disLikeCount =
      //   findLikeCount.filter((item) => item.type === "Dislike").length || 0;
      posts.isLiked =
        findLikeCount.filter(
          (item) => item.userId === userId && item.type === "Like"
        ).length > 0
          ? true
          : false;
      posts.isDisliked =
        findLikeCount.filter(
          (item) => item.userId === userId && item.type === "Dislike"
        ).length > 0
          ? true
          : false;
      posts.isVoted =
        findVotes.filter((vote) => vote.userId === userId).length > 0
          ? true
          : false;
      res.status(200).json({
        status: 200,
        message: "Topics fetched successfully",
        data: {
          posts,
          user: userData,
          comment: updatedComments,
        },
      });
    } catch (error) {
      console.error("Error fetching topics:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while fetching topics" });
    }
  } else if (slug[0] === "all_tour") {
    try {
      let posts;
        posts = await Tour.find({
          deleted: false,
          status: "PUBLIC",
        })
      res.status(200).json({
        status: 200,
        message: "Post fetched successfully",
        data: posts,
      });
    } catch (error) {
      console.error("Error fetching post:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while fetching post" });
    }
  } else if (slug[0] === "add_tour") {
    debugger
    console.log('eq.body======>',eq.body)
    try {
      const {
        title,
        status,
        tour,
        travel,
        meals,
        tripMap,
      } = req.body;
    
      const newTour = await Tour.create({
        title,
        status,
        tour,
        travel,
        meals,
        tripMap,
      });
    
      res.status(201).json({
        message: "Tour Created",
        tour: newTour,
        status: 201,
      });
    } catch (error) {
      console.error("Error creating tour:", error);
      res.status(500).json({
        error: "Something went wrong while creating the tour",
      });
    }
    
  } else if (slug[0] === "edit_spark") {
    try {
      const { title, description, category, image, id, tags } = req.body;
      const userId = req.user.id;
      const newTopic = await Post.findOneAndUpdate(
        { _id: id, userId, deleted: false },
        {
          title,
          description,
          category,
          image,
          // userId,
          tags,
        },
        { new: true }
      );
      res
        .status(201)
        .json({ message: "Topic Created", topic: newTopic, status: 201 });

      const access_codes = tags.map((tag) => tag.code);
    } catch (error) {
      console.error("Error creating topic:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while creating the topic" });
    }
  } else if (slug[0] === "search_spark") {
    try {
      const { search_query } = req.body;
      let query = {
        deleted: false,
      };

      if (search_query) {
        query = {
          ...query,
          title: { $regex: search_query, $options: "i" },
        };
      }
      const posts = await Post.find(query);
      res.status(200).json({
        status: 200,
        message: "Topics fetched successfully",
        data: posts,
      });
    } catch (error) {
      console.error("Error creating topic:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while creating the topic" });
    }
  } else if (slug[0] === "delete_spark") {
    try {
      const { spark_id } = req.body;
      const userId = req.user.id;
      const updatedPost = await Post.findOneAndUpdate(
        { _id: spark_id, userId },
        { $set: { deleted: true } }
      );
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json({
        message: "Post deleted successfully",
        postDelete: true,
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while deleting the post" });
    }
  } else if (slug[0] === "semantic_search") {
    try {
      if (!req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const { search_query } = req.body;

      res.status(200).json({
        status: 200,
        data: searchSpark,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while updating the post" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
  res.end(`Post: ${slug.join(", ")}`);
}
