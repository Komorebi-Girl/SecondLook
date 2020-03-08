const router = require("express").Router();
const passport = require("passport");

// auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

// router.get("/google", function(req, res) {
//   res.redirect("/");
//   console.log(res);
// });

// auth logout
router.get("/logout", function(req, res) {
  res.send("Logging out");
});

module.exports = router;
