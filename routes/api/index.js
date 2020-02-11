const router = require("express").Router();
const teachbackRoutes = require("./teachbacks");

// Book routes
router.use("/teachbacks", teachbackRoutes);

module.exports = router;
