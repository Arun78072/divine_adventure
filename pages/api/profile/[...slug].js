import checkAuth from "../middleware/checkAuth";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";

export default async function handler(req, res) {
  await checkAuth(req, res);
  await connectMongoDB();
  const { slug } = req.query;
  if (slug[0] === "user_detail") {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const userDetail = await User.findOne({
        _id: req.user.id,
      }).populate("wallet");
      const inviteCode = userDetail._id + userDetail.email;
      res.status(200).json({
        status: 200,
        message: "Topics fetched successfully",
        data: {
          ...userDetail.toObject(),
          inviteCode,
        },
      });
    } catch (error) {
      console.error("Error fetching topics:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while fetching topics" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
  res.end(`Post: ${slug.join(", ")}`);
}
