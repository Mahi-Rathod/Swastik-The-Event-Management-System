import nodemailer from 'nodemailer'
import { asyncHandler } from "../utils/asyncHandler.js";

const sendEmail = asyncHandler(async(req, res) => {
    const { name, email, message } = req.body;
    
    console.log("i am in controller.");
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
  
    // Setup email data with unicode symbols
    let mailOptions = {
      from: `"Contact Form" <${email}>`,
      to: "swastikindustriesltd7@gmail.com", // Change this to your email address
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
  
    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error sending email");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Email sent successfully");
      }
    });
  });

export {
    sendEmail,
}