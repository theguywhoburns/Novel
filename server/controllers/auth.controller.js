import { config as dotenvConfig } from 'dotenv-esm';
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { db } from "../db.js";
import { generateVerificationCode } from '../utils/utils.js';

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
          'INSERT INTO users (name) VALUES ($1) RETURNING "id"',
          [null]
        );

        userId = newUserIdResult.rows[0].id;

        if (!userId) {
          return res.status(404).json({ error: "User ID not found" });
        }

        const newCredentialsResult = await db.query(
          'INSERT INTO credentials (email, "userId") VALUES ($1, $2)',
          [email, userId]
        );
      }

      const verificationCode = generateVerificationCode();

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
      console.error(err);
      res.status(500).json({ error: err.message });
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

      const userAndCodeResult = await db.query(
        'SELECT "userId", "verificationCode" FROM credentials WHERE email = $1',
        [email]
      );

      if (!userAndCodeResult.rows || userAndCodeResult.rows.length === 0) {
        return res.status(404).json({ error: "User with this email not found." });
      }

      const user = userAndCodeResult.rows[0];
      const userId = user.userId;
      const sentVerificationCodeFromServer = user.verificationCode;

      if (verificationCode !== sentVerificationCodeFromServer) {
        return res.status(400).json({ error: "Invalid verification code" });
      }

      const userNameResult = await db.query(
        'SELECT name FROM users WHERE id = $1',
        [userId]
      );

      const userName = userNameResult.rows[0]?.name;

      const isNewUser = userName ? false : true;

      await db.query(
        'UPDATE credentials SET "verificationCode" = NULL WHERE "userId" = $1',
        [userId]
      );

      res
        .status(200)
        .json({
          message: "Verification code is valid",
          isNewUser
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async signIn(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const secretKey = process.env.SECRET_KEY;

      const userIdResult = await db.query(
        'SELECT "userId" FROM credentials WHERE email = $1',
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
      res.status(500).json({ error: err.message });
    }
  }

  async signUp(req, res) {
    try {
      const {
        email,
        name,
        birthDate,
        uploadedImages,
        gender,
        description,
        interests,
        zodiacSign,
        searchGoal,
        education,
        familyPlans,
        sport,
        alcohol,
        smoking
      } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const userIdResult = await db.query(
        'SELECT "userId" FROM credentials WHERE email = $1',
        [email]
      );

      const userId = userIdResult.rows[0].userId;

      console.log("userId: ", userId);

      if (!userId) {
        return res.status(404).json({ error: "User's id not found" });
      }

      const userResult = await db.query(
        `UPDATE users
          SET
            name = $1,
            "bDate" = $2,
            "uploadedImages" = $3,
            "gender" = $4,
            "description" = $5,
            "interests" = $6,
            "zodiacSign" = $7,
            "searchGoal" = $8,
            "education" = $9,
            "familyPlans" = $10,
            "sport" = $11,
            "alcohol" = $12,
            "smoke" = $13
          WHERE id = $14
          RETURNING *`,
        [
          name,
          birthDate,
          uploadedImages,
          gender,
          description,
          interests,
          zodiacSign,
          searchGoal,
          education,
          familyPlans,
          sport,
          alcohol,
          smoking,
          userId
        ]
      );

      const user = userResult.rows[0];

      const settingsResult = await db.query(
        'INSERT INTO settings ("userId") VALUES ($1) RETURNING *',
        [userId]
      );

      const settings = settingsResult.rows[0];

      if (!settings) {
        return res.status(404).json({ error: "Settings was not created" });
      }

      res.json({ userId: user?.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export default new AuthController();