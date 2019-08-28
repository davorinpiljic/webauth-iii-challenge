module.exports = (req, res, next) => {
  console.log(req.session.user);
  if (req.session && req.session.user) {
    console.log("good");
    next();
  } else {
    res.status(400).json({ message: "You shall not pass!" });
  }
};
