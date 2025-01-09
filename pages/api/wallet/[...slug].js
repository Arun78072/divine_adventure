import checkAuth from "../middleware/checkAuth";
import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/post";
import User from "@/models/user";
import Wallet from "@/models/wallet";

export default async function handler(req, res) {
  await checkAuth(req, res);
  await connectMongoDB();
  const { slug } = req.query;
  if (slug[0] === "pay_tip") {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      // Destructure necessary fields from request body
      const { sparkId, amount, reciverUserId } = req.body;
      console.log("amount   ====>", amount, reciverUserId);
      // Validate input
      if (!amount || !reciverUserId) {
        return res
          .status(400)
          .json({ error: "Amount and receiver user ID are required" });
      }

      if (amount <= 0) {
        return res
          .status(400)
          .json({ error: "Amount must be greater than zero" });
      }

      // Check if the sender is trying to send money to their own account
      if (req.user.id === reciverUserId) {
        return res
          .status(401)
          .json({ error: "You cannot send money to your own account" });
      }

      // Find the sender's wallet
      const senderWallets = await Wallet.find({ user: req.user.id });

      // Check if sender's wallet exists
      if (!senderWallets || senderWallets.length === 0) {
        return res
          .status(401)
          .json({ error: "Sender's wallet does not exist" });
      }

      // Use the first wallet if there are multiple (you might want to handle multiple wallets differently)
      const senderWallet = senderWallets[0];

      // Check if the wallet has sufficient amount
      if (senderWallet.amount < amount) {
        return res
          .status(401)
          .json({ error: "Insufficient amount in your wallet" });
      }

      // Deduct amount from the sender's wallet
      const updatedSenderWallet = await Wallet.findOneAndUpdate(
        { _id: senderWallet._id },
        { $set: { amount: senderWallet.amount - amount } },
        { new: true }
      );

      if (!updatedSenderWallet) {
        return res
          .status(500)
          .json({ error: "Failed to update sender's wallet" });
      }

      // Find the receiver's wallet
      const receiverWallet = await Wallet.findOne({ user: reciverUserId });

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
      const findPost = await Post.find({ _id: sparkId });
      const updatePost = await Post.findByIdAndUpdate(
        { _id: sparkId },
        {
          $set: { tip: Number(findPost[0].tip) + Number(amount) },
        }
      );
      console.log("updatePost ====>", updatePost);
      return res.status(200).json({
        message: "Amount transferred successfully",
        senderWallet: updatedSenderWallet,
        receiverWallet: updatedReceiverWallet,
      });
    } catch (error) {
      console.error("Error fetching topics:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while fetching topics" });
    }
  } else if (slug[0] === "add_money") {
    try {
      const { amount } = req.body;

      // Check if the user is authenticated
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      // Validate amount to ensure it's a positive number greater than zero
      if (typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({
          error: "Amount must be a positive number greater than zero",
        });
      }

      // Find the wallet for the user
      let wallet = await Wallet.findOne({ user: req.user.id });

      if (wallet) {
        // Update the existing wallet
        wallet.amount = Number(wallet.amount) + Number(amount);
        const updatedWallet = await wallet.save(); // Save the updated wallet

        res.status(200).json({
          status: 200,
          message: "Successfully added amount to existing wallet",
          data: updatedWallet,
        });
      } else {
        // Create a new wallet if it doesn't exist
        const newWallet = await Wallet.create({
          user: req.user.id,
          amount: amount,
        });

        if (!newWallet) {
          return res.status(500).json({ error: "Error creating wallet" });
        }

        // Attach the new wallet to the user
        const userUpdate = await User.findByIdAndUpdate(
          req.user.id,
          { wallet: newWallet._id },
          { new: true }
        );

        if (!userUpdate) {
          return res
            .status(500)
            .json({ error: "Error linking wallet to user" });
        }

        res.status(200).json({
          status: 200,
          message: "Successfully created wallet and added amount",
          data: newWallet,
        });
      }
    } catch (error) {
      console.error("Error processing request:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
  res.end(`Post: ${slug.join(", ")}`);
}
