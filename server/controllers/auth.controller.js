import jwt from "jsonwebtoken";
import { db } from "../db.js";
import nodemailer from "nodemailer";

class AuthController {
  async signUp(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      // Check if the email exists in the credentials table
      const userResult = await db.query(
        "SELECT user_id FROM credentials WHERE email = $1",
        [email]
      );

      if (userResult.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const userId = userResult.rows[0].user_id;

      // Generate a 6-digit random code
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      // Store the code in the database
      await db.query(
        "UPDATE credentials SET verification_code = $1 WHERE user_id = $2",
        [verificationCode, userId]
      );

      // Send the verification code via email
      const transporter = nodemailer.createTransport({
        service: "gmail", // or your email provider
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Your Verification Code",
        text: `Your verification code is: ${verificationCode}`,
      });

      res.json({ message: "Verification code sent to email" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async verifyCode(req, res) {
    try {
      const { email, verificationCode } = req.body;

      if (!email || !verificationCode) {
        return res
          .status(400)
          .json({ error: "Email and verification code are required" });
      }

      // Validate the code
      const result = await db.query(
        "SELECT user_id FROM credentials WHERE email = $1 AND verification_code = $2",
        [email, verificationCode]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Invalid verification code" });
      }

      const userId = result.rows[0].user_id;

      // Generate a permanent token
      const secretKey = process.env.JWT_SECRET;
      const token = jwt.sign({ user_id: userId }, secretKey);

      // Clear the verification code
      await db.query(
        "UPDATE credentials SET verification_code = NULL WHERE user_id = $1",
        [userId]
      );

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async signIn(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      // Check if the user exists
      const userResult = await db.query(
        "SELECT user_id FROM credentials WHERE email = $1",
        [email]
      );

      if (userResult.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const userId = userResult.rows[0].user_id;

      // Generate a 6-digit random code
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      // Store the code in the database
      await db.query(
        "UPDATE credentials SET verification_code = $1 WHERE user_id = $2",
        [verificationCode, userId]
      );

      // Send the verification code via email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Your Verification Code",
        text: `Your verification code is: ${verificationCode}`,
      });

      res.json({ message: "Verification code sent to email" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new AuthController();
