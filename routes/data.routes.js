const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();
const Data = require("../models/Data.model");
const User = require("../models/User.model");

// CREATE DATA
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const userId = req.body.user;
    const data = { ...req.body, user: userId };
    const newData = await Data.create(data);
    await User.findByIdAndUpdate(userId, {
      $push: { data: newData._id },
    });
    res.status(201).json({ data: newData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// GET DATA BY ID
router.get("/:userId", isAuthenticated, async (req, res) => {
  const { userId } = req.params;
  try {
    const userDatas = await Data.find({ user: userId });
    res.json(userDatas);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

// UPDATE DATA BY ID
router.put("/:dataId", isAuthenticated, async (req, res) => {
  const { dataId } = req.params;
  try {
    const updatedData = await Data.findByIdAndUpdate(dataId, req.body, {
      new: true,
    });
    res.status(200).json({ data: updatedData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// DELETE DATA BY ID
router.delete("/:dataId", isAuthenticated, async (req, res) => {
  const { dataId } = req.params;
  try {
    const currentData = await Data.findById(dataId);
    await Data.findByIdAndDelete(dataId);
    await User.findByIdAndUpdate(currentData.user, {
      $pull: { data: dataId },
    });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
