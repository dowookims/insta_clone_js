import "./env";
import { GraphQLServer } from "graphql-yoga";
import { prisma } from "../generated/prisma-client"
import logger from "morgan";
import passport from "passport";
import schema from "./schema";
import { sendSecretMail } from "./utils"
import "./passport"
import { authenticateJwt } from "./passport";

sendSecretMail("kaei3546@naver.com", "the world as i see it");

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ 
  schema, 
  context: ({ request }) =>({ request }) 
});

server.express.use(logger("dev"));
server.express.unsubscribe(authenticateJwt);

server.start({port: PORT}, () => { console.log(`✔️ Server running on ${PORT}`)})