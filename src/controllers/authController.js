const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { googleClientID, googleClientSecret, jwtSecret } = require('../../config/config');

passport.use(new GoogleStrategy({
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: "/api/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

 passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const googleAuth = (req, res) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
};

const googleAuthCallback = (req, res) => {
  passport.authenticate('google', async (err, user) => {
    if (err) {
      return res.redirect('/auth/failure');
    }

    console.log(user._json.email)
     const email = user._json.email
     const name = user.name.givenName
     const id = user.id
     const pass = user.id + user._json.email

     let newUser = await User.findOne({ email });
     if (!newUser) {
       newUser = new User({ name: name, email: email, password: pass, googleId: id  });
      await newUser.save();
    }
    console.log(newUser)
    const token = jwt.sign({ user: newUser.id }, jwtSecret, {
      expiresIn: '30d',
    });
    res.json({token});
  })(req, res);
};

module.exports = {
  googleAuth,
  googleAuthCallback,
};