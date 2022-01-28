const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const passport = require('passport')
const User = require('../models').User

passport.use('google', new GoogleStrategy({
    clientID: '636607011823-0gv6dhaj4jgqu3sfaqa9fun9hpjsrgpr.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'https://see-event-app.herokuapp.com/api/v1/auth/google/callback'
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
    // console.log(findUser);
    cb(null, findUser)
  }
))

passport.use('facebook', new FacebookStrategy({
  clientID: "1087234412117060",
  clientSecret: "124bbe656c73b14a62cd532019fc862f",
  callbackURL: "https://see-event-app.herokuapp.com/api/v1/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
},
async function(accessToken, refreshToken, profile, cb) {
  cb(null, profile)
  // console.log(findUserFB);
}
));
