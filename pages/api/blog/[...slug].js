import checkAuth from "../middleware/checkAuth";
import connectMongoDB from "@/lib/mongodb";
import Blog from "@/models/blog";

export default async function handler(req, res) {
  await checkAuth(req, res);
  await connectMongoDB();
  const { slug } = req.query;
  if (slug[0] === "blog_get_by_id") {
    try {
      const { blogId } = req.query;
      const blog = await Blog.findOne({
        _id: blogId,
        deleted: false,
      });
      if (!blog._id) {
        res.status(404).json({ error: "Invalid Tour Id" });
      }
      res.status(200).json({
        status: 200,
        message: "Blog fetched successfully",
        data: blog,
      });
    } catch (error) {
      console.error("Error fetching topics:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while fetching topics" });
    }
  }  else if (slug[0] === "all_blog") {
    try {
      const blog = await Blog.find({
        deleted: false,
      });
      res.status(200).json({
        status: 200,
        message: "Blog fetched successfully",
        data: blog,
      });
    } catch (error) {
      console.error("Error fetching tour:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while fetching tour" });
    }
  } else if (slug[0] === "add_blog") {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    try {
      const newBlog = await Blog.create({ ...req.body });
      res.status(201).json({
        message: "Blog Created",
        tour: newBlog,
        status: 201,
      });
    } catch (error) {
      console.error("Error creating tour:", error);
      res.status(500).json({
        error: "Something went wrong while creating the tour",
      });
    }
  } else if (slug[0] === "edit_tour") {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const { id, ...data } = req.body;
      const newBlog = await Blog.findOneAndUpdate(
        { _id: id, deleted: false },
        {
          ...data,
        },
        { new: true }
      );
      res
        .status(201)
        .json({ message: "Blog Created", data: newBlog, status: 201 });
    } catch (error) {
      console.error("Error creating topic:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while creating the topic" });
    }
  } else if (slug[0] === "delete_blog") {
    try {
      const { blog_id } = req.query;
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }
     
      const deletedBlog= await Blog.findByIdAndDelete(blog_id);

      if (!deletedBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.status(200).json({
        message: "Blog deleted successfully",
        BlogDelete: true,
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while deleting the blog" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
  res.end(`Blog: ${slug.join(", ")}`);
}
