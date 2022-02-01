const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "rishabhSrivastava";

// Create a user using post "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body(
      "name",
      "Enter a valid name, Name should be minimum of 5 characters"
    ).isLength({ min: 5 }),
    body("email", "Enter a valid email id").isEmail(),
    body("password", "Password should be minimum of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are error, return bad request and return errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    // Check whether user with same email alreay exist.
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "Sorry, a user with this email already exists" });
      }
      // Password Hashing using bcryptJs
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);

      // user creation
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // Token Signature
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Authenticate the user poat "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a valid email id").isEmail(),
    body("password", "Password cannot be left blank ").exists(),
  ],
  async (req, res) => {
    // If there are error, return bad request and return errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Login with correct credintials" });
      }
      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Login with correct credintials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// fetching user login detail from database using post "/api/auth/getuser". login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
