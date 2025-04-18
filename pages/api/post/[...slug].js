import checkAuth from "../middleware/checkAuth";
import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/post";
import User from "@/models/user";
import Tag from "@/models/tag";
import LikeDislike from "@/models/likeDislike";
import Vote from "@/models/vote";
import Comment from "@/models/comment";

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
  } else if (slug[0] === "all_spark") {
    const { type } = req.query;
    try {
      let posts;
      if (type === "popular") {
        // Get top 12 popular posts
        posts = await Post.find({
          deleted: false,
          status: "PUBLIC",
        })
          .sort({
            likeCount: -1, // Use -1 for descending order (most popular first)
          })
          .limit(13);
      } else {
        // Get all public posts
        posts = await Post.find({
          deleted: false,
          status: "PUBLIC",
        }).sort({
          likeCount: -1, // Same sorting for other types
        });
      }

      // Send the response
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
  } else if (slug[0] === "post_spark") {
    try {
      const { title, description, category, image, tags } = req.body;
      const userId = req.user.id;
      const newTopic = await Post.create({
        title,
        description,
        category,
        image,
        userId,
        tags,
      });
      res
        .status(201)
        .json({ message: "Topic Created", topic: newTopic, status: 201 });
    } catch (error) {
      // Handle errors
      console.error("Error creating topic:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while creating the topic" });
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
  } else if (slug[0] === "like_dislike_action") {
    const { id, type, endpoint } = req.body;
    const userId = req.user.id;
    try {
      let responseMessage;
      if (endpoint === "add_actions") {
        const addAction = await LikeDislike.create({
          postId: id,
          userId,
          type,
        });
        if (!addAction) {
          return res.status(404).json({ error: "No Record Found" });
        }
        const updateField = type === "Like" ? "likeCount" : "disLikeCount";
        console.log("updateField", updateField);
        await Post.findOneAndUpdate(
          { _id: id },
          { $inc: { [updateField]: 1 } }
        );
        responseMessage = `Spark ${type} successfully`;
      } else if (endpoint === "update_actions") {
        const updateAction = await LikeDislike.findOneAndUpdate(
          {
            userId,
            postId: id,
          },
          {
            type,
          },
          { new: true }
        );
        if (!updateAction) {
          return res.status(404).json({ error: "No Record Found" });
        }
        const updateField = type === "Like" ? "likeCount" : "disLikeCount";
        const deteleField = type === "Like" ? "disLikeCount" : "likeCount";
        await Post.findOneAndUpdate(
          { _id: id },
          { $inc: { [updateField]: 1, [deteleField]: -1 } }
        );
        responseMessage = "Post Action Updated successfully";
      } else if (endpoint === "delete_actions") {
        const findPost = await LikeDislike.findOneAndDelete({
          postId: id,
          userId,
        });
        if (!findPost) {
          return res.status(404).json({ error: "No Record Found" });
        }
        const updateField = type === "Like" ? "likeCount" : "disLikeCount";
        await Post.findOneAndUpdate(
          { _id: id },
          { $inc: { [updateField]: -1 } }
        );
        responseMessage = "Post Action Deleted successfully";
      } else {
        return res.status(400).json({ error: "Invalid action" });
      }

      res.status(200).json({
        message: responseMessage,
      });
    } catch (error) {
      console.error("Error processing action:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while processing the action" });
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
  } else if (slug[0] === "search_tags") {
    try {
      if (!req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const { search_query } = req.body;
      let query = {};
      if (search_query) {
        query = {
          name: { $regex: search_query, $options: "i" },
        };
      }
      const tagList = await Tag.find(query).limit(10);
      res.status(200).json({
        status: 200,
        data: tagList,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while updating the post" });
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
  } else if (slug[0] === "add_tags") {
    try {
      if (!req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const { name } = req.body;
      const tagLength = await Tag.findOne({}, {}, { sort: { code: -1 } });
      const newTags = await Tag.create([
        { name, code: Number(tagLength.code) + 1 },
      ]);
      res.status(200).json({
        status: 200,
        data: newTags,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while updating the post" });
    }
  } else if (slug[0] === "handle_vote") {
    try {
      const userId = req.user.id;
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const { postId } = req.body;
      const vote = await Vote.findOne({ postId, userId });
      let postUpdate;
      if (!vote) {
        await Vote.create({ postId, userId });
        postUpdate = await Post.findOneAndUpdate(
          { _id: postId, deleted: false },
          {
            $inc: { voteCount: 1 },
          },
          { new: true }
        );
      } else {
        await Vote.findOneAndDelete({ _id: vote._id });
        postUpdate = await Post.findOneAndUpdate(
          { _id: postId, deleted: false },
          {
            $inc: { voteCount: -1 },
          },
          { new: true }
        );
      }
      console.log("postUpdate =======>", postUpdate._id);
      res.status(200).json({
        status: 200,
        message: "Successfully update vote",
      });
    } catch (error) {
      console.error("Error updating post:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while updating the post" });
    }
  } else if (slug[0] === "add_comment") {
    try {
      const userId = req.user.id;
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const { postId, comment } = req.body;
      const addComment = await Comment.create({
        postId,
        user: userId,
        comment,
      });
      await Post.findOneAndUpdate(
        { _id: postId, deleted: false },
        {
          $inc: { commentCount: 1 },
        }
      );
      res.status(200).json({
        status: 200,
        message: "Successfully Add Comment",
        data: addComment,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while updating the post" });
    }
  } else if (slug[0] === "delete_comment") {
    try {
      const userId = req.user.id;
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const { commentId, type } = req.query;
      const findComment = await Comment.find({
        $or: [
          { _id: commentId, user: userId },
          { commentId: commentId, user: userId },
        ],
      });
      if (findComment.length > 0) {
        await Comment.deleteMany({
          $or: [
            { _id: commentId, user: userId },
            { commentId: commentId, user: userId },
          ],
        });
        console.log("type ==============>", type, findComment);
        if (type == "comment") {
          await Post.findOneAndUpdate(
            { _id: findComment[0].postId, deleted: false },
            {
              $inc: { commentCount: -1 },
            }
          );
        }
        res.status(200).json({
          status: 200,
          message: "Successfully Delete Comment",
        });
      } else {
        res.status(403).json({
          status: 403,
          message: "User not authorized to delete this comment",
        });
      }
    } catch (error) {
      console.error("Error updating post:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while updating the post" });
    }
  } else if (slug[0] === "like_comment") {
    try {
      const userId = req.user.id;
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const { commentId } = req.body;
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      const likeIndex = comment.like.findIndex(
        (like) => like.user.toString() === userId
      );
      if (likeIndex !== -1) {
        comment.like.splice(likeIndex, 1);
        comment.likeCount -= 1;
      } else {
        comment.like.push({ user: userId });
        comment.likeCount += 1;
      }
      await comment.save();
      res.status(200).json({
        status: 200,
        message: "Successfully update Comment Like",
        data: comment,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while updating the post" });
    }
  } else if (slug[0] === "add_comment_reply") {
    try {
      const userId = req.user.id;
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const { postId, commentId, replyString } = req.body;
      const addReply = await Comment.create({
        postId,
        user: userId,
        commentId,
        comment: replyString,
      });
      if (!addReply) {
        return res
          .status(404)
          .json({ error: "Comment not found or update failed" });
      }
      res.status(200).json({
        status: 200,
        message: "Successfully update vote",
        data: addReply,
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
