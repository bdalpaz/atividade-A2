const db = require('../config/database');

function listar(filtroStatus) {
  let sql = `
    SELECT m.*,
           a.nome AS aluno_nome,
           a.cpf  AS aluno_cpf,
           p.nome AS plano_nome
    FROM matriculas m
    JOIN alunos a ON a.id = m.aluno_id
    JOIN planos p ON p.id = m.plano_id
  `;
  const params = [];
  if (filtroStatus && (filtroStatus === 'ATIVA' || filtroStatus === 'CANCELADA')) {
    sql += ' WHERE m.status = ?';
    params.push(filtroStatus);
  }
  sql += ' ORDER BY m.criada_em DESC';
  return db.all(sql, params);
}

function buscarPorId(id) {
  return db.get(
    `SELECT m.*,
            a.nome AS aluno_nome,
            a.cpf  AS aluno_cpf,
            p.nome AS plano_nome,
            p.duracao_meses AS plano_duracao
     FROM matriculas m
     JOIN alunos a ON a.id = m.aluno_id
     JOIN planos p ON p.id = m.plano_id
     WHERE m.id = ?`,
    [id]
  );
}

function buscarAtivaVigentePorAluno(alunoId, hojeISO) {
  return db.get(
    `SELECT * FROM matriculas
     WHERE aluno_id = ? AND status = 'ATIVA' AND data_fim >= ?`,
    [alunoId, hojeISO]
  );
}

function buscarAtivaVigentePorCpf(cpf, hojeISO) {
  return db.get(
    `SELECT m.*, p.nome AS plano_nome
     FROM matriculas m
     JOIN alunos a ON a.id = m.aluno_id
     JOIN planos p ON p.id = m.plano_id
     WHERE a.cpf = ? AND m.status = 'ATIVA' AND m.data_fim >= ?
     ORDER BY m.data_fim DESC`,
    [cpf, hojeISO]
  );
}

function criar(matricula) {
  db.run(
    `INSERT INTO matriculas (aluno_id, plano_id, data_inicio, data_fim, status)
     VALUES (?, ?, ?, ?, 'ATIVA')`,
    [matricula.aluno_id, matricula.plano_id, matricula.data_inicio, matricula.data_fim]
  );
  return db.lastInsertId();
}

function cancelar(id) {
  db.run(`UPDATE matriculas SET status = 'CANCELADA' WHERE id = ?`, [id]);
}

function contarAtivasVigentes(hojeISO) {
  const r = db.get(
    `SELECT COUNT(*) AS total FROM matriculas
     WHERE status = 'ATIVA' AND data_fim >= ?`,
    [hojeISO]
  );
  return r ? r.total : 0;
}

module.exports = {
  listar,
  buscarPorId,
  buscarAtivaVigentePorAluno,
  buscarAtivaVigentePorCpf,
  criar,
  cancelar,
  contarAtivasVigentes,
};
