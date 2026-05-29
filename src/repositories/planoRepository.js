const db = require("../config/database");

function listar() {
  return db.all("SELECT * FROM planos ORDER BY duracao_meses");
}

function listarAtivos() {
  return db.all("SELECT * FROM planos WHERE ativo = 1 ORDER BY duracao_meses");
}

function buscarPorId(id) {
  return db.get("SELECT * FROM planos WHERE id = ?", [id]);
}

function criar(plano) {
  db.run(
    `INSERT INTO planos (nome, duracao_meses, valor, descricao, ativo)
     VALUES (?, ?, ?, ?, ?)`,
    [
      plano.nome,
      plano.duracao_meses,
      plano.valor,
      plano.descricao,
      plano.ativo ? 1 : 0,
    ],
  );
  return db.lastInsertId();
}

function atualizar(id, plano) {
  db.run(
    `UPDATE planos
     SET nome = ?, duracao_meses = ?, valor = ?, descricao = ?, ativo = ?
     WHERE id = ?`,
    [
      plano.nome,
      plano.duracao_meses,
      plano.valor,
      plano.descricao,
      plano.ativo ? 1 : 0,
      id,
    ],
  );
}

function excluir(id) {
  db.run("DELETE FROM planos WHERE id = ?", [id]);
}

function contarAtivos() {
  const r = db.get("SELECT COUNT(*) AS total FROM planos WHERE ativo = 1");
  return r ? r.total : 0;
}

module.exports = {
  listar,
  listarAtivos,
  buscarPorId,
  criar,
  atualizar,
  excluir,
  contarAtivos,
};
