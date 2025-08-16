// app_api/config/passport.js
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

// Require the model file directly (executes and returns the model)
const User = require('../models/user');

module.exports = function (passport) {
  // Local strategy (email/password)
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email }).exec();
        if (!user) return done(null, false, { message: 'Incorrect Username' });
        if (!user.validPassword || !user.validPassword(password))
          return done(null, false, { message: 'Incorrect Password' });
        return done(null, user);
      } catch (err) { return done(err); }
    }
  ));

  // JWT strategy (Bearer token)
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret'
  };

  passport.use(new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload._id).exec();
      return user ? done(null, user) : done(null, false);
    } catch (err) { return done(err, false); }
  }));
};
