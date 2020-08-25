const router = require("express").Router();
const teachbackRoutes = require("./teachbacks");
const userRoutes = require("./user");
const taFinalRoutes = require("./taFinals");

// Teachback routes
router.use("/teachbacks", teachbackRoutes);

// User routes
router.use("/user", userRoutes);

// TA Final routes
router.use("/taFinals", taFinalRoutes);

module.exports = router;
