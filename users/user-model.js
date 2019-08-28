const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy
};

function add(user) {
  return db("users").insert(user);
}
function find() {
  return db("users");
}
function findBy(username) {
  return db("users").where(username);
}
