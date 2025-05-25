// import connectMongoDB from "@/lib/mongodb";
// import Post from "@/models/post";
// import { getToken } from "next-auth/jwt";

// export default async function handler(req, res) {
//   res.status(405).json({ message: "Method Not Allowed" });
// }


import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  await connectMongoDB();
  const { slug } = req.query;
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  if (slug[0] !== "login_user") {
    return res.status(404).json({ message: "Route Not Found" });
  }
  try {
    const { userId, password } = req.body;
    if (!userId || !password) {
      return res.status(400).json({ error: "Missing userId or password" });
    }
    const user = await User.findOne({ email: userId });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // const isMatch = await bcrypt.compare(password, user.password);

    // if (!isMatch) {
    //   return res.status(401).json({ error: "Invalid credentials" });
    // }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
