const router = require("express").Router();
const passport = require("passport");

// auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

// auth logout
router.get("/logout", function(req, res) {
  res.send("Logging out");
});

// callback route after google sign-in
router.get("/google/redirect", passport.authenticate("google"), function(
  req,
  res
) {
  res.send(req.user);
});

module.exports = router;
