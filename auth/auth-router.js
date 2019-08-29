const Users = require("../users/user-model.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");
// const generateToken = require("./generateToken.js");
router.post("/register", async (req, res) => {
  console.log(req.body);
  const newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 10);
  newUser.password = hash;
  try {
    const users = await Users.add(newUser);
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(401).json({ message: "You shall not register!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      console.log(user);

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "Logged in", token });
      } else {
        res
          .status(401)
          .json(req.session.user, { message: "You shall not pass!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username,
    department: user.department
    // ...otherData
  };
  console.log("payload");

  const options = {
    expiresIn: "1h" // show other available options in the library's documentation
  };
  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}

module.exports = router;
