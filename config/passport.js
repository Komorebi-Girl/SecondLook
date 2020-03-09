const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys.js");
const User = require("../models/user.js");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user) {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ googleID: profile.id })
        .then(function(user) {
          //No user was found... so create a new user with profile info from Google
          if (!user) {
            user = new User({
              userFirstName: profile.name.givenName,
              userLastName: profile.name.familyName,
              googleID: profile.id
            });
            user
              .save()
              .then(function(user) {
                console.log("new user created!", user);
                return done(null, user);
              })
              .catch(function(err) {
                if (err) {
                  console.log(err);
                  return done(err);
                }
              });
          } else {
            //found user. Return
            return done(null, user);
          }
        })
        .catch(function(err) {
          if (err) {
            console.log(err);
            return done(err);
          }
        });
    }
  )
);
