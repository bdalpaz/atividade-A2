const db = require("../config/database");

function buscarPorEmail(email) {
  return db.get("SELECT * FROM usuarios WHERE email = ?", [email]);
}

function buscarPorId(id) {
  return db.get("SELECT * FROM usuarios WHERE id = ?", [id]);
}

module.exports = { buscarPorEmail, buscarPorId };
