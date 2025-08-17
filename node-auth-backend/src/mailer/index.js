import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendMail = (email, otp) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.GMAIL_EMAIL,
        to: email,
        subject: "Your OTP for login :",
        text: `Your OTP is ${otp}`,
      },
      (err, info) => {
        if(err) {
            reject(err);
        } else {
            resolve("OK");
        }
      }
    );
  });
};