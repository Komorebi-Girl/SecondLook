const router = require("express").Router();
const teachbackRoutes = require("./teachbacks");
const userRoutes = require("./user");

// Teachback routes
router.use("/teachbacks", teachbackRoutes);

// User routes
router.use("/user", userRoutes);

module.exports = router;
