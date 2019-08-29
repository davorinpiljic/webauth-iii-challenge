const db = require("../config/dbConfig.js");

module.exports = {
  add,
  find,
  findBy
};

function add(user) {
  return db("users").insert(user);
}
function find(department) {
  return db("users").where({ department: department });
}
function findBy(username) {
  return db("users").where(username);
}
