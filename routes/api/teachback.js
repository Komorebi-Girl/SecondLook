const router = require("express").Router();
const teachbackController = require("../../controllers/teachbackController");

// Matches with "/api/teachback"
router
  .route("/")
  .get(teachbackController.findAll)
  .post(teachbackController.create);

// Matches with "/api/teachback/myTBs/userID"
router.route("/mytbs/:userID").get(teachbackController.findUserTBs);

// Matches with "/api/teachback/:id"
router
  .route("/:id")
  .get(teachbackController.findById)
  .put(teachbackController.update)
  .delete(teachbackController.remove);

module.exports = router;
