const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')
const User = require('../models').User

passport.use('google', new GoogleStrategy({
    clientID: process.env.CLIEN_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL_GOOGLE
  },
  async function(accessToken, refreshToken, profile, cb) {
    const findUser = await User.findOrCreate({
      where: {
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        photo: profile.photos[0].value
      }
    })
    console.log(findUser);
    cb(null, findUser)
  }
));