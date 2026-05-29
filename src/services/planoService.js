const planoRepository = require('../repositories/planoRepository');

function listar() {
  return planoRepository.listar();
}

function listarAtivos() {
  return planoRepository.listarAtivos();
}

function buscarPorId(id) {
  const plano = planoRepository.buscarPorId(id);
  if (!plano) throw new Error('Plano não encontrado.');
  return plano;
}

function validar(dados) {
  if (!dados.nome || dados.nome.trim().length < 2) {
    throw new Error('O nome do plano deve ter ao menos 2 caracteres.');
  }
  const duracao = Number(dados.duracao_meses);
  if (!Number.isInteger(duracao) || duracao <= 0) {
    throw new Error('A duração deve ser um número inteiro de meses maior que zero.');
  }
  const valor = Number(dados.valor);
  if (Number.isNaN(valor) || valor < 0) {
    throw new Error('O valor deve ser um número maior ou igual a zero.');
  }
}

function montar(dados) {
  return {
    nome: dados.nome.trim(),
    duracao_meses: Number(dados.duracao_meses),
    valor: Number(dados.valor),
    descricao: dados.descricao ? dados.descricao.trim() : null,
    ativo: dados.ativo === 'on' || dados.ativo === '1' || dados.ativo === true || dados.ativo === 1,
  };
}

function criar(dados) {
  validar(dados);
  return planoRepository.criar(montar(dados));
}

function atualizar(id, dados) {
  buscarPorId(id);
  validar(dados);
  planoRepository.atualizar(id, montar(dados));
}

function excluir(id) {
  buscarPorId(id);
  planoRepository.excluir(id);
}

module.exports = {
  listar,
  listarAtivos,
  buscarPorId,
  criar,
  atualizar,
  excluir,
};