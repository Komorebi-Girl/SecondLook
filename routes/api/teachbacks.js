const router = require("express").Router();
const teachbacksController = require("../../controllers/teachbacksController");

// Matches with "/api/teachbacks"
router
  .route("/")
  .get(teachbacksController.findAll)
  .post(teachbacksController.create);

// Matches with "/api/teachbacks/:id"
router
  .route("/:id")
  .get(teachbacksController.findById)
  .put(teachbacksController.update)
  .delete(teachbacksController.remove);

module.exports = router;
