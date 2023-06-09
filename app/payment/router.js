var express = require("express");
var router = express.Router();
const {
  index,
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
  actionStatus,
  actionDelete,
} = require("./controller");

const { isLoginAdmin } = require("../middlewares/auth");

/* GET home page. */

router.use(isLoginAdmin);
router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", actionCreate);
router.get("/edit/:id", viewEdit);
router.put("/edit/:id", actionEdit);
router.put("/status/:id", actionStatus);
router.delete("/delete/:id", actionDelete);

module.exports = router;
