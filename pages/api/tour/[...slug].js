import checkAuth from "../middleware/checkAuth";
import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/post";
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
  } else if (slug[0] === "tour_get_by_id") {
    try {
      const { tourId } = req.query;
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const tour = await Tour.findOne({
        _id: tourId,
        deleted: false,
      });
      console.log("tour ========?>", tour);
      if (!tour._id) {
        res.status(404).json({ error: "Invalid Tour Id" });
      }
      res.status(200).json({
        status: 200,
        message: "Tour fetched successfully",
        data: tour,
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
      });
      res.status(200).json({
        status: 200,
        message: "Tour fetched successfully",
        data: posts,
      });
    } catch (error) {
      console.error("Error fetching tour:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while fetching tour" });
    }
  } else if (slug[0] === "add_tour") {
    console.log("eq.body======>", req.body);
    try {
      const newTour = await Tour.create({ ...req.body });
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
  } else if (slug[0] === "edit_tour") {
    try {
      const { id, ...data } = req.body;
      console.log('id =======>',id)
      const newTour = await Tour.findOneAndUpdate(
        { _id: id, deleted: false },
        {
          ...data,
        },
        { new: true }
      );
      res
        .status(201)
        .json({ message: "Tour Created", data: newTour, status: 201 });
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
  } else if (slug[0] === "delete_tour") {
    try {
      const { tour_id } = req.query;
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      console.log('tour_id ========>',tour_id)
      // const updatedPost = await Tour.findOneAndUpdate(
      //   { _id: tour_id },
      //   { $set: { deleted: true } }
      // );
      const deletedTour = await Tour.findByIdAndDelete(tour_id);

      if (!deletedTour) {
        return res.status(404).json({ error: "Tour not found" });
      }
      res.status(200).json({
        message: "Tour deleted successfully",
        TourDelete: true,
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
