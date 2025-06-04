import checkAuth from "../middleware/checkAuth";
import connectMongoDB from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Needed for formidable
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  await checkAuth(req, res);
  await connectMongoDB();

  const { slug } = req.query;

  if (slug[0] === "upload_image") {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
    debugger;
    const form = formidable({ keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Upload error:", err);
        return res.status(500).json({ error: "Error parsing form" });
      }
      console.log("backend files ==========>", files);
      const file = files.image?.[0];
      if (!file) {
        return res.status(400).json({ error: "No image uploaded" });
      }

      try {
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: "nextjs_uploads", // Optional folder
        });
        console.log('upload result =======>',result)
        return res.status(200).json({
          status: 200,
          message: "Image uploaded successfully",
          url: result.secure_url,
        });
      } catch (uploadErr) {
        console.error("Cloudinary error:", uploadErr);
        return res.status(500).json({ error: "Upload failed" });
      }
    });
  } else {
    return res.status(405).json({ message: "Route Not Allowed" });
  }
}
