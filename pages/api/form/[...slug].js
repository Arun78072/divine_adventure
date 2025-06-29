import checkAuth from "../middleware/checkAuth";
import connectMongoDB from "@/lib/mongodb";
import nodemailer from "nodemailer";
export default async function handler(req, res) {
  await checkAuth(req, res);
  await connectMongoDB();
  const { slug } = req.query;
  if (slug[0] === "tour_book") {
    try {
      console.log("tour_book req ======>", req.body);
      const { name, email, phoneNumber, message, people } = req.body;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: 'uic.19mca8112@gmail.com',
        //   user: process.env.USER,
          pass: process.env.PASSWORD,
        },
      });
      console.log(
        "transporter ======>",
        
        process.env.PASSWORD
      );
      const mailOptions = {
        from: email,
        to: 'uic.19mca8112@gmail.com',
        // to: process.env.EMAIL_USER,
        subject: `New Booking from ${name}`,
        html: `
          <h3>Tour Booking Request</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phoneNumber}</p>
          <p><strong>People:</strong> ${people}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      res
        .status(200)
        .json({ success: true, message: "Email sent successfully" });
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
