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
  req.logout();
  res.redirect("http://localhost:3000/");
});

// callback route after google sign-in
router.get("/google/redirect", passport.authenticate("google"), function(
  req,
  res
) {
  res.redirect(`http://localhost:3000/dashboard/${req.user.id}`);
});

router.get("/user", function(req, res) {
  res.json(req.user);
});

module.exports = router;
