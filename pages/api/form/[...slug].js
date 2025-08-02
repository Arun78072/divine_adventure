import checkAuth from "../middleware/checkAuth";
import connectMongoDB from "@/lib/mongodb";
import nodemailer from "nodemailer";
export default async function handler(req, res) {
  await checkAuth(req, res);
  await connectMongoDB();
  const { slug } = req.query;
  if (slug[0] === "tour_book") {
    try {
      const { name, email, phoneNumber, message, people, formType, url ,country} =
        req.body;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "divineadventureholidays35@gmail.com",
          pass: process.env.PASSWORD,
        },
      });
      console.log('======>auth check ', process.env.PASSWORD,process.env.USER)
      // 1️⃣ Email to Admin
      const adminMailOptions = {
        from: email,
        to: "divineadventureholidays35@gmail.com",
        subject: `New Tour Booking from ${name}`,
        html: `
          <p>Dear Admin,</p>
          <p>You have received a new <strong>Tour Booking Request</strong>. Below are the details:</p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone Number:</strong> ${phoneNumber}</li>
            <li><strong>Number of People:</strong> ${people}</li>
            <li><strong>Name of country:</strong> ${country}</li>
            <li><strong>Form Type:</strong> ${formType}</li>
            <li><strong>Tour Page:</strong> <a href="${url}" target="_blank">${url}</a></li>
          </ul>
          <p><strong>User Message:</strong></p>
          <p>${message || "No message was provided by the user."}</p>
          <br/>
          <p>Best regards,<br/>Your Website</p>
        `,
      };

      // 2️⃣ Email to User (Confirmation)
      const userMailOptions = {
        from: "divineadventureholidays35@gmail.com",
        to: email,
        subject: `Your Tour Booking Request Has Been Received`,
        html: `
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to us. We have received your booking/query and will get back to you shortly.</p>
          <p><strong>Summary of your submission:</strong></p>
          <ul>
            <li><strong>Phone Number:</strong> ${phoneNumber}</li>
            <li><strong>Name of country:</strong> ${country}</li>
          </ul>
          <p><strong>Your Message:</strong></p>
          <p>${message || "No message provided."}</p>
          <br/>
          <p>We’ll be in touch with more details soon!</p>
          <p>Warm regards,<br/>Divine Adventure Team</p>
        `,
      };

      // Send emails
      await transporter.sendMail(adminMailOptions); // to admin
      await transporter.sendMail(userMailOptions); // to user

      res.status(200).json({
        success: true,
        message: "Email sent to both admin and user successfully",
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
