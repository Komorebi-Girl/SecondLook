const express = require("express");
// const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const passport = require("passport");
const passportSetup = require("./config/passport.js");
const cookieSession = require("cookie-session");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes");

// Use morgan logger for logging requests
app.use(logger("dev"));

// Serve up static assets
app.use(express.static("client/build"));

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use cookie-session to conceal user id of logged-in user
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.REACT_APP_SESSION_COOKIE_KEY]
  })
);

console.log("over here!", process.env.REACT_APP_GOOGLE_CLIENT_ID);
//initializing passport
app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and auth
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI ||
    `mongodb://${process.env.REACT_APP_MLAB_USERNAME}:${process.env.REACT_APP_MLAB_PASSWORD}@ds159100.mlab.com:59100/heroku_6mc1jvwt`,
  {
    useMongoClient: true
  }
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
