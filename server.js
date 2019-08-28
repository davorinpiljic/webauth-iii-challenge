//import
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
//import models
const Users = require("./users/user-model.js");
//import routers
const authRouter = require("./auth/auth-router.js");
const userRouter = require("./users/user-router.js");
//server
const server = express();
//general Use
server.use(express.json());
server.use(cors());
//middleware
//routers
server.use("/api", authRouter);
server.use("/api/users", userRouter);
//endpoints
//session middleware
//port and listen
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
