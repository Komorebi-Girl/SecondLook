const express = require("express");
// const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const passport = require("passport");
const passportSetup = require("./config/passport.js");
const PORT = process.env.PORT || 3001;

const app = express();
// app.use(cors());
app.use(passport.initialize());

const routes = require("./routes");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Add routes, both API and view
app.use(routes);
// Serve up static assets
app.use(express.static("client/build"));

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/teachbacksDB",
  {
    useMongoClient: true
  }
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
