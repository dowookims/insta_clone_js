require('dotenv').config();
import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import { prisma } from '../generated/prisma-client';


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_TOKEN
};

const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id})
    if (user !== null){
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
};

passport.use(new Strategy(jwtOptions, verifyUser));