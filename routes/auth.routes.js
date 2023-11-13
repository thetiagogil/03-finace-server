const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/routeGuard.middleware");

const router = require("express").Router();

router.get("/", (res) => {
  res.json("All good in here");
});

router.post("/signup", async (req, res) => {
  const salt = bcrypt.genSaltSync(13);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = await User.create({ ...req.body, passwordHash });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const potentialUser = await User.findOne({ username });
  if (potentialUser) {
    if (bcrypt.compareSync(password, potentialUser.passwordHash)) {
      const authToken = jwt.sign(
        { userId: potentialUser._id },
        process.env.TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "4h",
        }
      );

      res.status(200).json({ token: authToken });
    } else {
      res.status(400).json({ message: "Incorrect password." });
    }
  } else {
    res.status(400).json({ message: "Incorrect username" });
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  res.json(req.payload);
});

module.exports = router;
