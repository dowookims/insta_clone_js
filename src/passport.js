import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import { prisma } from '../generated/prisma-client';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_TOKEN
};

const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id })
    if (user !== null){
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
};

export const authenticateJwt = (req, res, next) => 
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user){
      req.user = user;
    }
  next();
})(req, res, next); // return 된 함수를 이 3인자로 실행해줘야 한다.

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();