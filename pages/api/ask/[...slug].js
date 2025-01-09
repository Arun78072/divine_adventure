import checkAuth from "../middleware/checkAuth";
import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/post";
import User from "@/models/user";
import Bounty from "@/models/bounty";
import Wallet from "@/models/wallet";
import Ask from "@/models/ask";
import Comment from "@/models/comment";

export default async function handler(req, res) {
  await checkAuth(req, res);
  await connectMongoDB();
  const { slug } = req.query;
  if (slug[0] === "my_bounty") {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const bounty = await Bounty.find({
        user: req.user.id,
        isDelete: false,
      });
      res.status(200).json({
        status: 200,
        message: "Bounty fetched successfully",
        data: bounty,
      });
    } catch (error) {
      console.error("Error fetching topics:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while fetching topics" });
    }
  } else if (slug[0] === "question") {
    try {
      const { questionId } = req.query;
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const question = await Ask.findOne({
        _id: questionId,
        isDelete: false,
      }).populate("user");

      if (question && question.bounty) {
        await question.populate("bounty");
      }

      if (!question._id) {
        res.status(404).json({ error: "Invalid Question Id" });
      }
      const findComments = await Comment.find({ postId: questionId }).populate(
        "user"
      );
      res.status(200).json({
        status: 200,
        message: "Question fetched successfully",
        data: {
          question,
          answer: findComments,
        },
      });
    } catch (error) {
      console.error("Error fetching topics:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while fetching topics" });
    }
  } else if (slug[0] === "all_question") {
    try {
      const questions = await Ask.find({ isDelete: false, status: "ACTIVE" })
        .populate("user")
        .sort({ createdAt: 1 });
      res.status(200).json({
        status: 200,
        message: "Questions fetched successfully",
        data: questions,
      });
    } catch (error) {
      console.error("Error fetching Questions:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while fetching bounty" });
    }
  } else if (slug[0] === "post_question") {
    try {
      const { title, bounty } = req.body;
      console.log("bounty =======> ", bounty);
      const userId = req.user.id;
      const createQuestion = await Ask.create({
        title,
        user: userId,
        ...(bounty && { bounty }),
      });

      res.status(201).json({
        message: "Question Created",
        question: createQuestion,
        status: 201,
      });
    } catch (error) {
      console.error("Error creating Bounty:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while creating the Bounty" });
    }
  } else if (slug[0] === "submit_spark") {
    try {
      const { sparkId, bountyId } = req.body;
      const userId = req.user.id;
      const findSpark = await Post.findOne({ _id: sparkId, userId });
      if (!findSpark) {
        return res.status(404).json({ error: "Invalid Spark Id" });
      }
      const findBounty = await Bounty.findOne({ _id: bountyId });
      if (findBounty.user.toString() === userId) {
        return res
          .status(404)
          .json({ error: "You can't submit your own Spark" });
      }

      if (
        findBounty.sparks.filter((item) => item.spark.toString() === sparkId)
          .length > 0
      ) {
        return res.status(404).json({ error: "Duplicate spark Found" });
      }
      const updateBounty = await Bounty.findOneAndUpdate(
        { _id: bountyId },
        {
          $push: {
            sparks: {
              spark: sparkId,
              dateAdded: new Date(),
            },
          },
        },
        {
          new: true,
        }
      );
      if (!updateBounty) {
        return res.status(404).json({ error: "Something Went Wrong" });
      }
      return res.status(200).json({
        message: "Spark submitted successfully.",
        data: { spark: findSpark, dateAdded: new Date() },
        status: 200,
      });
    } catch (error) {
      console.error("Error creating Bounty:", error);
      return res
        .status(500)
        .json({ error: "Something went wrong while creating the Bounty" });
    }
  } else if (slug[0] === "edit_question") {
    try {
      const { id, title, description, amount } = req.body;
      const user = req.user.id;
      //   const findWallet = await Wallet.findOne({ user: req.user.id });
      //   if (findWallet.amount < amount) {
      //     return res.status(400).json({ error: "Insufficient balance" });
      //   }
      //   if (typeof amount !== "number" || amount <= 0) {
      //     return res.status(400).json({
      //       error: "Amount must be a positive number greater than zero",
      //     });
      //   }

      //   const findBounty = await Bounty.findOne({
      //     _id: id,
      //     user,
      //     isDelete: false,
      //   });

      //   const newBounty = await Bounty.findOneAndUpdate(
      //     { _id: id, user, isDelete: false },
      //     {
      //       title,
      //       description,
      //       amount,
      //     },
      //     { new: true }
      //   );

      res.status(201).json({ message: "Bounty Created", status: 201 });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Something went wrong while update the bounty" });
    }
  } else if (slug[0] === "delete_question") {
    try {
      const { question_id } = req.body;
      const user = req.user.id;
      const updatedQuestion = await Ask.findOneAndUpdate(
        { _id: question_id, user },
        { $set: { isDelete: true } }
      );
      if (!updatedQuestion) {
        return res.status(404).json({ error: "Question not found" });
      }
      res.status(200).json({
        message: "Question deleted successfully",
        questionDelete: true,
      });
    } catch (error) {
      console.error("Error deleting question:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while deleting the Question" });
    }
  } else if (slug[0] === "search_question") {
    try {
      const { search_query } = req.body;
      const userId = req.user.id;
      let query = {
        isDelete: false,
      };

      if (search_query) {
        query = {
          ...query,
          title: { $regex: search_query, $options: "i" },
        };
      }
      const posts = await Ask.find(query);
      res.status(200).json({
        status: 200,
        message: "Question fetched successfully",
        data: posts,
      });
    } catch (error) {
      console.error("Error creating Question:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while creating the Question" });
    }
  } else if (slug[0] === "search_bounty") {
    try {
      const { search_query } = req.body;
      const userId = req.user.id;
      let query = {
        user: userId,
        isDelete: false,
      };

      if (search_query) {
        query = {
          ...query,
          title: { $regex: search_query, $options: "i" },
        };
      }
      const posts = await Bounty.find(query);
      res.status(200).json({
        status: 200,
        message: "Bounty fetched successfully",
        data: posts,
      });
    } catch (error) {
      console.error("Error creating topic:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while creating the topic" });
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
        type: "ASK",
      });
      await Ask.findOneAndUpdate(
        { _id: postId, isDelete: false },
        {
          $inc: { answerCount: 1 },
        }
      );
      res.status(200).json({
        status: 200,
        message: "Successfully Add Answer",
        data: addComment,
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
