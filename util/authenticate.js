const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtrctJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/user');

const opts = {};

const cookieExtractor = (req) => {
  const token = req && req.cookies ? req.cookies.token : null;
  return token;
};
opts.jwtFromRequest = ExtrctJwt.fromExtractors([ExtrctJwt.fromAuthHeaderAsBearerToken(),
  cookieExtractor]);
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, ((payload, done) => {
  User.getById(payload.userId, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
})));

module.exports = passport;