import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/post";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  res.status(405).json({ message: "Method Not Allowed" });
}
