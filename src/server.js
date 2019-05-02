require('dotenv').config();
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import passport from "passport";
import schema from "./schema";
import { sendSecretMail } from "./utils"
import "./passport"

sendSecretMail("kaei3546@naver.com", "the world as i see it");

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));
server.express.use(passport.authenticate("jwt"));

server.start({port: PORT}, () => { console.log(`✔️ Server running on ${PORT}`)})