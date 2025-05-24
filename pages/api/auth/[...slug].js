// import connectMongoDB from "@/lib/mongodb";
// import Post from "@/models/post";
// import { getToken } from "next-auth/jwt";

// export default async function handler(req, res) {
//   res.status(405).json({ message: "Method Not Allowed" });
// }



import checkAuth from "../middleware/checkAuth";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { getToken } from "next-auth/jwt";


export default async function handler(req, res) {
  await checkAuth(req, res);
  await connectMongoDB();
  const { slug } = req.query;
  if (slug[0] === "login_user") {
    try {
      const { userId, password } = req.body;
      console.log("amount   ====>", userId, password);
      if (!userId || !password) {
        return res
          .status(400)
          .json({ error: "Invalid Credintials" });
      }
      return res.status(200).json({
        message: "Login successfully",
        senderWallet: updatedSenderWallet,
        receiverWallet: updatedReceiverWallet,
      });
    } catch (error) {
      console.error("Error fetching topics:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while fetching topics" });
    }
  }  else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
  res.end(`Post: ${slug.join(", ")}`);
}
