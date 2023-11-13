const router = require("express").Router();

router.get("/", (res) => {
  res.json("All good in here");
});

const userRoutes = require("./user.routes");
router.use("/user", userRoutes);

const dataRoutes = require("./data.routes");
router.use("/data", dataRoutes);

module.exports = router;
