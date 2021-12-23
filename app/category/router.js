const router = require("express").Router();
const { index, create, remove, update, single } = require("./controller");

router.route("/category").get(index).post(create);
router.route("/category/:id").get(single).delete(remove).put(update);

module.exports = router;
