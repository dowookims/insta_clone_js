import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";


const sendMail = email => { 
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const generateSecret = () =>  {
  const randomNumber = Math.floor(Math.random()*  adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`
};

//with sendgrid
export const sendSecretMail = (address, secret) => {
  const email = {
    from: "dou@prismagram.com",
    to: address,
    subject: "🔒Login for Insta_cloning apps🔒",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/> Copy paste on the app/web to login`
  };
  return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id}, process.env.JWT_TOKEN);