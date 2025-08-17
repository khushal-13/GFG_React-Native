import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();


export const isFieldEmpty = (field) => {
  return !field || field.trim() === "";
};

export const generateToken = (email) => {
  const token = jwt.sign({email}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});
  return token;
};

export const verifyToken = (token) => {
  return new Promise((res, rej) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, result) => {
      if (err) {
        console.log(err);
        rej(err);
      } else {
        res(result);
      }
    })
  })
}

