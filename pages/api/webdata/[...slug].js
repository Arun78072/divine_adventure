import checkAuth from "../middleware/checkAuth";
import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/post";
import WebData from "@/models/webData";

export default async function handler(req, res) {
  await checkAuth(req, res);
  await connectMongoDB();
  const { slug } = req.query;
  if (slug[0] === "update_headline") {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const { id ,title } = req.body;
      const updateTitle = await WebData.findOneAndUpdate(
        { _id: id},
        {
          title,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "Headline is sucessfully updated",
        data :updateTitle
      });
    } catch (error) {
      console.error("Error update Heading:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while update Heading" });
    }
  } else if (slug[0] == "get_headline") {
    try {
      const data = await WebData.find({});
      res.status(200).json({
        status: 200,
        message: "Data fetched successfully",
        data: data,
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
