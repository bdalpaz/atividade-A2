const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');
const bcrypt = require('bcryptjs');

const DB_DIR = path.join(__dirname, '..', '..', 'database');
const DB_PATH = path.join(DB_DIR, 'academia.db');

let db = null;

function persist() {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

function criarTabelas() {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha_hash TEXT NOT NULL,
      perfil TEXT NOT NULL CHECK (perfil IN ('ADMIN', 'RECEPCAO')),
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS alunos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cpf TEXT NOT NULL UNIQUE,
      email TEXT,
      telefone TEXT,
      data_nascimento DATE,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS planos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      duracao_meses INTEGER NOT NULL,
      valor REAL NOT NULL,
      descricao TEXT,
      ativo INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS matriculas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      aluno_id INTEGER NOT NULL,
      plano_id INTEGER NOT NULL,
      data_inicio DATE NOT NULL,
      data_fim DATE NOT NULL,
      status TEXT NOT NULL DEFAULT 'ATIVA' CHECK (status IN ('ATIVA', 'CANCELADA')),
      criada_em DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (aluno_id) REFERENCES alunos(id),
      FOREIGN KEY (plano_id) REFERENCES planos(id)
    );
  `);
}

function contar(tabela) {
  const res = db.exec(SELECT COUNT(*) AS total FROM ${tabela});
  return res.length ? res[0].values[0][0] : 0;
}

function popularSeeds() {
  if (contar('usuarios') === 0) {
    const senhaAdmin = bcrypt.hashSync('admin123', 10);
    const senhaRecep = bcrypt.hashSync('recep123', 10);
    db.run(
      INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES (?, ?, ?, ?), (?, ?, ?, ?),
      [
        'Administrador', 'admin@gymcontrol.com', senhaAdmin, 'ADMIN',
        'Recepção', 'recepcao@gymcontrol.com', senhaRecep, 'RECEPCAO',
      ]
    );
  }

  if (contar('planos') === 0) {
    db.run(
      `INSERT INTO planos (nome, duracao_meses, valor, descricao, ativo) VALUES
        (?, ?, ?, ?, 1),
        (?, ?, ?, ?, 1),
        (?, ?, ?, ?, 1),
        (?, ?, ?, ?, 1)`,
      [
        'Mensal', 1, 99.90, 'Acesso livre por 1 mês.',
        'Trimestral', 3, 269.90, 'Acesso livre por 3 meses com desconto.',
        'Semestral', 6, 499.90, 'Acesso livre por 6 meses com desconto maior.',
        'Anual', 12, 899.90, 'Melhor custo-benefício, 12 meses de acesso.',
      ]
    );
  }

  if (contar('alunos') === 0) {
    db.run(
      `INSERT INTO alunos (nome, cpf, email, telefone, data_nascimento) VALUES
        (?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?)`,
      [
        'João da Silva', '52998224725', 'joao@email.com', '49999990001', '1998-04-12',
        'Maria Oliveira', '11144477735', 'maria@email.com', '49999990002', '2001-09-30',
      ]
    );
  }

  persist();
}

async function init() {
  if (db) return db;

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  criarTabelas();
  popularSeeds();
  return db;
}

function getDb() {
  if (!db) {
    throw new Error('Banco de dados não inicializado. Chame init() antes.');
  }
  return db;
}

function run(sql, params = []) {
  getDb().run(sql, params);
  persist();
}

function all(sql, params = []) {
  const stmt = getDb().prepare(sql);
  stmt.bind(params);
  const linhas = [];
  while (stmt.step()) {
    linhas.push(stmt.getAsObject());
  }
  stmt.free();
  return linhas;
}

function get(sql, params = []) {
  const linhas = all(sql, params);
  return linhas.length ? linhas[0] : null;
}

function lastInsertId() {
  const res = getDb().exec('SELECT last_insert_rowid() AS id');
  return res.length ? res[0].values[0][0] : null;
}

module.exports = { init, getDb, run, all, get, lastInsertId, persist };
