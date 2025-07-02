import checkAuth from "../middleware/checkAuth";
import connectMongoDB from "@/lib/mongodb";
import Tour from "@/models/tour";

export default async function handler(req, res) {
  await checkAuth(req, res);
  await connectMongoDB();
  const { slug } = req.query;
  if (slug[0] === "tour_get_by_id") {
    try {
      const { tourId } = req.query;
      const tour = await Tour.findOne({
        _id: tourId,
        deleted: false,
      });
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
  } else if (slug[0] === "tour_get_by_category") {
    try {
      const { categoryId } = req.query;
      const posts = await Tour.find({
        tourTypeId: categoryId,
        deleted: false,
        status:'PUBLIC'
      });
      // const extractedTours = posts.map(tour => {
      //   const {_id} = tour
      //   const { coverImage, title, price} = tour.tourInfo;
      //   return { coverImage, title, price ,_id};
      // });
      
      res.status(200).json({
        status: 200,
        message: "Tour fetched successfully",
        data: posts,
      });
    } catch (error) {
      console.error("Error fetching topics:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while fetching topics" });
    }
  } else if (slug[0] === "all_tour") {
    try {
      const posts = await Tour.find({
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
    console.log("Req.body======>", req.body);
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }
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
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const { id, ...data } = req.body;
      console.log("id =======>", id);
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
  } else if (slug[0] === "delete_tour") {
    try {
      const { tour_id } = req.query;
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      console.log("tour_id ========>", tour_id);
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
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
  res.end(`Post: ${slug.join(", ")}`);
}
