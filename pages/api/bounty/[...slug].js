import checkAuth from "../middleware/checkAuth";
import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/post";
import User from "@/models/user";
import Bounty from "@/models/bounty";
import Wallet from "@/models/wallet";

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
  } else if (slug[0] === "bounty") {
    try {
      const { bountyId } = req.query;
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const userId = req.user.id;
      const bounty = await Bounty.findOne({
        _id: bountyId,
        isDelete: false,
      }).populate("sparks.spark");

      if (!bounty?._id) {
        return res.status(404).json({ error: "Bounty Not Available" });
      }
      if (bounty.status === "INACTIVE" && String(bounty.user) != userId) {
        return res.status(404).json({ error: "Bounty Not Available" });
      }
      const userData = await User.findOne({ _id: bounty.user });
      res.status(200).json({
        status: 200,
        message: "Bounty fetched successfully",
        data: {
          bounty,
          user: userData,
        },
      });
    } catch (error) {
      console.error("Error fetching topics:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while fetching topics" });
    }
  } else if (slug[0] === "all_bounty") {
    try {
      const bounty = await Bounty.find({ isDelete: false, status: "ACTIVE" });
      res.status(200).json({
        status: 200,
        message: "Bounties fetched successfully",
        data: bounty,
      });
    } catch (error) {
      console.error("Error fetching bounty:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while fetching bounty" });
    }
  } else if (slug[0] === "post_bounty") {
    try {
      const { title, description, amount } = req.body;
      const userId = req.user.id;

      if (typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({
          error: "Amount must be a positive number greater than zero",
        });
      }
      const findWallet = await Wallet.findOne({ user: userId });

      if (findWallet.amount < amount) {
        return res.status(400).json({ error: "Insufficient balance" });
      }
      const updateWallet = await Wallet.findOneAndUpdate(
        { _id: findWallet._id },
        {
          $set: {
            amount: findWallet.amount - amount,
            balanceOnHold: findWallet.balanceOnHold + amount,
          },
        },
        { new: true }
      );
      if (!updateWallet._id) {
        res.status(500).json({ error: "Something went wrong" });
      }
      const newBounty = await Bounty.create({
        title,
        description,
        amount,
        user: userId,
      });
      res
        .status(201)
        .json({ message: "Bounty Created", bounty: newBounty, status: 201 });
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
  } else if (slug[0] === "edit_bounty") {
    try {
      const { id, title, description, amount } = req.body;
      const user = req.user.id;
      const findWallet = await Wallet.findOne({ user: req.user.id });
      if (findWallet.amount < amount) {
        return res.status(400).json({ error: "Insufficient balance" });
      }
      if (typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({
          error: "Amount must be a positive number greater than zero",
        });
      }

      const findBounty = await Bounty.findOne({
        _id: id,
        user,
        isDelete: false,
      });
      if (findBounty.sparks.length > 0) {
        return res.status(400).json({ error: "Now you can't update Bounty" });
      }

      const newBounty = await Bounty.findOneAndUpdate(
        { _id: id, user, isDelete: false },
        {
          title,
          description,
          amount,
        },
        { new: true }
      );

      res
        .status(201)
        .json({ message: "Bounty Created", bounty: newBounty, status: 201 });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Something went wrong while update the bounty" });
    }
  } else if (slug[0] === "delete_bounty") {
    try {
      const { bounty_id } = req.body;
      const user = req.user.id;
      const updatedBounty = await Bounty.findOneAndUpdate(
        { _id: bounty_id, user },
        { $set: { isDelete: true } }
      );
      console.log("updatedBounty ======>", updatedBounty, bounty_id, user);
      if (!updatedBounty) {
        return res.status(404).json({ error: "Bounty not found" });
      }
      res.status(200).json({
        message: "Bounty deleted successfully",
        bountyDelete: true,
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while deleting the Bounty" });
    }
  } else if (slug[0] === "search_spark") {
    try {
      const { search_query } = req.body;
      const userId = req.user.id;
      let query = {
        userId,
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
  } else if (slug[0] === "accept_spark") {
    try {
      const { sparkId, bountyId } = req.body;

      const findBounty = await Bounty.findOne({ _id: bountyId });
      if (!findBounty._id) {
        return res.status(404).json({ error: "Bounty Not Found" });
      }
      if (findBounty.status != "ACTIVE") {
        return res.status(404).json({ error: "This Bounty is not Active" });
      }

      const findValidSpark = findBounty.sparks.filter(
        (item) => String(item.spark) == sparkId
      );

      const findSpark = await Post.findOne({ _id: sparkId });

      if (findValidSpark.length < 1) {
        return res.status(404).json({ error: "Invalid Spark Id" });
      }
      const amount = findBounty.amount;
      const senderWallets = await Wallet.find({ user: req.user.id });
      if (!senderWallets || senderWallets.length === 0) {
        return res
          .status(401)
          .json({ error: "Sender's wallet does not exist" });
      }
      if (senderWallets[0].balanceOnHold < amount) {
        return res
          .status(401)
          .json({ error: "Insufficient amount in your wallet" });
      }
      // Deduct amount from the sender's wallet
      const updatedSenderWallet = await Wallet.findOneAndUpdate(
        { _id: senderWallets[0]._id },
        { $set: { balanceOnHold: senderWallets[0].balanceOnHold - amount } },
        { new: true }
      );
      if (!updatedSenderWallet) {
        return res
          .status(500)
          .json({ error: "Failed to update sender's wallet" });
      }

      // Find the receiver's wallet
      const receiverWallet = await Wallet.findOne({
        user: findSpark.userId,
      });
      // Check if receiver's wallet exists
      if (!receiverWallet) {
        return res
          .status(404)
          .json({ error: "Receiver's wallet does not exist" });
      }

      // Add amount to the receiver's wallet
      const updatedReceiverWallet = await Wallet.findOneAndUpdate(
        { _id: receiverWallet._id },
        { $set: { amount: receiverWallet.amount + amount } },
        { new: true }
      );

      if (!updatedReceiverWallet) {
        return res
          .status(500)
          .json({ error: "Failed to update receiver's wallet" });
      }

      const updateSpark = await Post.findOneAndUpdate(
        { _id: findValidSpark[0].spark },
        {
          $set: { userId: findBounty.user },
        },
        { new: true }
      );

      if (!updateSpark) {
        return res
          .status(404)
          .json({ error: "Something went wrong while transfer spark" });
      }

      const updateBounty = await Bounty.findOneAndUpdate(
        { _id: bountyId },
        {
          $set: { status: "INACTIVE" },
        },
        {
          new: true,
        }
      );

      console.log("updateBounty =======> ", updateBounty);

      return res.status(200).json({
        message: "Spark submitted successfully.",
        status: 200,
      });
    } catch (error) {
      console.error("Error creating Bounty:", error);
      return res
        .status(500)
        .json({ error: "Something went wrong while creating the Bounty" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
  res.end(`Post: ${slug.join(", ")}`);
}
