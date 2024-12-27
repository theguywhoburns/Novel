import { config as dotenvConfig } from 'dotenv-esm';
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { db } from "../db.js";

dotenvConfig();

class AuthController {
  async sendVerificationCode(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const userIdResult = await db.query(
        'SELECT "userId" FROM credentials WHERE email = $1',
        [email]
      );

      let userId;

      if (userIdResult.rowCount) {
        userId = userIdResult.rows[0].userId;
      } else {
        const newUserIdResult = await db.query(
          'INSERT INTO users (name) VALUES ($1) RETURNING "userId"',
          [null]
        );

        userId = newUserIdResult.rows[0].userId;

        console.log(userId);

        const newCredentialsResult = await db.query(
          'INSERT INTO credentials (email, "userId") VALUES ($1, $2) RETURNING "userId"',
          [email, userId]
        );
      }

      const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

      await db.query(
        'UPDATE credentials SET "verificationCode" = $1 WHERE "userId" = $2',
        [verificationCode, userId]
      );

      const transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"Novel Team" <${process.env.EMAIL}>`,
        to: email,
        subject: "Novel auth",
        text: `Добро пожаловать в Novel! Ваш код верификации: ${verificationCode}`,
      });

      res.json({ message: "Verification code sent to email" });
    } catch (err) {
      res.status(500).json({ err });
    }
  }

  async checkVerificationCode(req, res) {
    try {
      const { email, verificationCode } = req.body;

      if (!email || !verificationCode) {
        return res
          .status(400)
          .json({ error: "Email and verification code are required" });
      }

      const userIdResult = await db.query(
        'SELECT "userId" FROM credentials WHERE email = $1 AND "verificationCode" = $2',
        [email, verificationCode]
      );

      const userId = userIdResult.rows[0].userId;

      if (!userId) {
        return res.status(404).json({ error: "User ID not found" });
      }

      await db.query(
        'UPDATE credentials SET "verificationCode" = NULL WHERE "userId" = $1',
        [userId]
      );

      res
        .status(200)
        .json({
          message: "Verification code is valid",
          isNewUser: userIdResult.rowCount
        });
    } catch (err) {
      res.status(500).json({ err });
    }
  }

  async signIn(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const secretKey = process.env.SECRET_KEY;

      const userIdResult = await db.query('SELECT "userId" FROM credentials WHERE email = $1',
        [email]
      );

      const userId = userIdResult.rows[0].userId;

      if (!userId) {
        return res.status(404).json({ error: "User's id not found" });
      }

      const userResult = await db.query(
        "SELECT * FROM users WHERE id = $1",
        [userId]
      );

      const user = userResult.rows[0];

      if (!user.id) {
        return res.status(404).json({ error: "User not found" });
      }

      const token = jwt.sign({ userId: user.id }, secretKey);

      if (!token) {
        return res.status(500).json({ error: "Token not generated" });
      }

      const decodedToken = jwt.verify(token, secretKey);

      res.json({ userId: decodedToken.userId });
    } catch (err) {
      res.status(500).json({ err });
    }
  }

  async signUp(req, res) {
    try {
      const { email, name } = req.body;
    } catch (err) {
      res.status(500).json({ err });
    }
  }
};

export default new AuthController();
