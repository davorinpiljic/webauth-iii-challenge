const Users = require("../users/user-model.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const restrictedVerify = require("../auth/restricted-middleware.js");

router.get("/", restrictedVerify, async (req, res) => {
  const department = req.user.department;
  const users = await Users.find(department);

  try {
    if (users) {
      res.status(200).json({ users });
    } else {
      res.status(401).json({ message: "You shall not pass!" });
    }
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

module.exports = router;
