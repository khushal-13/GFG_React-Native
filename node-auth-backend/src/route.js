import express from "express";
import crypto, { verify } from "crypto";
import { generate } from "otp-generator";
import { generateToken, isFieldEmpty, verifyToken } from "./utils/helper.js";
import { sendMail } from "./mailer/index.js";

const appRouter = express.Router();
const UserMap = new Map();

const addNewUser = (name, email, password) => {
  const id = crypto.randomUUID();
  const otp = generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const user = { id, name, email, password, otp, isVerified: false };
//   const addedUser = UserMap.set(email, user);
//   return addedUser.get(email);
  UserMap.set(email, user);
  return user;
};

appRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (isFieldEmpty(name) || isFieldEmpty(email) || isFieldEmpty(password)) {
    return res.status(401).json({ message: "Invalid Data" });
  }

  try {
    const user = addNewUser(name, email, password);
    await sendMail(email, user.otp);
    if (!user) {
      return res.status(422).json({ message: "Unable to create user" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occured" });
  }
});

appRouter.post("/verify", (req, res) => {
  const { email, otp } = req.body;
  if (isFieldEmpty(email) || isFieldEmpty(otp)) {
    return res.status(401).json({ message: "Invalid data recieved" });
  }

  try {
    const user = UserMap.get(email);
    if (!user) {
      return res.status(422).json({ message: "User not found" });
    }
    if (user.otp === otp) {
      user.isVerified = true;
      const token = generateToken(email);
      return res.status(200).json({ message: "OTP Verified", user, token });
    } else {
      return res.status(401).json({ message: "Invalid OTP", user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occured" });
  }
});

appRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (isFieldEmpty(email) || isFieldEmpty(password)) {
    return res.status(401).json({ message: "Invalid data" });
  }

  try {
    const user = UserMap.get(email);
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }
    if (user.isVerified && user.password === password) {
      const token = generateToken(email);
      return res.status(200).json({ message: "User logged In", user, token });
    } else {
      return res.status(422).json({ message: "Invalid Email/Password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occured" });
  }
});

appRouter.post("/validate", async (req, res) => {
  const { token } = req.body;
  if (isFieldEmpty(token)) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const tokenData = await verifyToken(token);
    console.log(tokenData);
    const user = UserMap.get(tokenData.email);

    if (!user || !user.isVerified) {
      return res.status(403).json({ message: "User not found" });
    } else {
      return res.status(200).json({ user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occured" });
  }
});

export default appRouter;
