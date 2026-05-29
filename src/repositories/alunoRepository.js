const db = require('../config/database');

function listar(filtro) {
  if (filtro && filtro.trim() !== '') {
    const like = `%${filtro.trim()}%`;
    return db.all(
      `SELECT * FROM alunos
       WHERE nome LIKE ? OR cpf LIKE ?
       ORDER BY nome`,
      [like, like]
    );
  }
  return db.all('SELECT * FROM alunos ORDER BY nome');
}

function buscarPorId(id) {
  return db.get('SELECT * FROM alunos WHERE id = ?', [id]);
}

function buscarPorCpf(cpf) {
  return db.get('SELECT * FROM alunos WHERE cpf = ?', [cpf]);
}

function criar(aluno) {
  db.run(
    `INSERT INTO alunos (nome, cpf, email, telefone, data_nascimento)
     VALUES (?, ?, ?, ?, ?)`,
    [aluno.nome, aluno.cpf, aluno.email, aluno.telefone, aluno.data_nascimento]
  );
  return db.lastInsertId();
}

function atualizar(id, aluno) {
  db.run(
    `UPDATE alunos
     SET nome = ?, cpf = ?, email = ?, telefone = ?, data_nascimento = ?
     WHERE id = ?`,
    [aluno.nome, aluno.cpf, aluno.email, aluno.telefone, aluno.data_nascimento, id]
  );
}

function excluir(id) {
  db.run('DELETE FROM alunos WHERE id = ?', [id]);
}

function contar() {
  const r = db.get('SELECT COUNT(*) AS total FROM alunos');
  return r ? r.total : 0;
}

module.exports = {
  listar,
  buscarPorId,
  buscarPorCpf,
  criar,
  atualizar,
  excluir,
  contar,
};
