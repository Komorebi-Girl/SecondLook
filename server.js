require("dotenv").config();
const express = require("express");
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
    keys: [process.env.REACT_APP_SESSION_COOKIE_KEY],
  })
);

//initializing passport
app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and auth
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB

// mongoose
//   .connect(
//     process.env.DB_URI ||
//       `mongodb+srv://sjeanphilippe:${process.env.DB_PASSWORD}@secondlook.jdowm.mongodb.net/heroku_6mc1jvwt?retryWrites=true&w=majority`,
//     {
//       useMongoClient: true,
//     }
//   )
//   .then(() => {
//     console.log("Connected to MongoDB Cloud");
//   })
//   .catch((err) => console.log(err));

mongoose.connect(
  `mongodb+srv://sjeanphilippe:${process.env.DB_PASSWORD}@secondlook.jdowm.mongodb.net/heroku_6mc1jvwt?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
