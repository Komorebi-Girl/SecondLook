const router = require("express").Router();

// auth with google
router.get("/google", function(req, res) {
  res.send("Logging in with google");
});

// auth logout
router.get("/logout", function(req, res) {
  res.send("Logging out");
});

module.exports = router;
