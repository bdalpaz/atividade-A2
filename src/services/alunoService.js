const alunoRepository = require('../repositories/alunoRepository');

function limparCpf(cpf) {
  return (cpf || '').replace(/\D/g, '');
}

function cpfValido(cpf) {
  cpf = limparCpf(cpf);
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  const calcDigito = (base, pesoInicial) => {
    let soma = 0;
    for (let i = 0; i < base.length; i++) {
      soma += parseInt(base[i], 10) * (pesoInicial - i);
    }
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  const dig1 = calcDigito(cpf.slice(0, 9), 10);
  const dig2 = calcDigito(cpf.slice(0, 10), 11);
  return dig1 === parseInt(cpf[9], 10) && dig2 === parseInt(cpf[10], 10);
}

function emailValido(email) {
  if (!email) return true; // e-mail é opcional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function listar(filtro) {
  return alunoRepository.listar(filtro);
}

function buscarPorId(id) {
  const aluno = alunoRepository.buscarPorId(id);
  if (!aluno) throw new Error('Aluno não encontrado.');
  return aluno;
}

function validar(dados, idAtual = null) {
  if (!dados.nome || dados.nome.trim().length < 3) {
    throw new Error('O nome deve ter ao menos 3 caracteres.');
  }
  if (!cpfValido(dados.cpf)) {
    throw new Error('CPF inválido.');
  }
  if (!emailValido(dados.email)) {
    throw new Error('E-mail em formato inválido.');
  }

  const cpfLimpo = limparCpf(dados.cpf);
  const existente = alunoRepository.buscarPorCpf(cpfLimpo);
  if (existente && existente.id !== Number(idAtual)) {
    throw new Error('Já existe um aluno cadastrado com este CPF.');
  }
}

function criar(dados) {
  validar(dados);
  return alunoRepository.criar({
    nome: dados.nome.trim(),
    cpf: limparCpf(dados.cpf),
    email: dados.email ? dados.email.trim() : null,
    telefone: dados.telefone ? dados.telefone.trim() : null,
    data_nascimento: dados.data_nascimento || null,
  });
}

function atualizar(id, dados) {
  buscarPorId(id);
  validar(dados, id);
  alunoRepository.atualizar(id, {
    nome: dados.nome.trim(),
    cpf: limparCpf(dados.cpf),
    email: dados.email ? dados.email.trim() : null,
    telefone: dados.telefone ? dados.telefone.trim() : null,
    data_nascimento: dados.data_nascimento || null,
  });
}

function excluir(id) {
  buscarPorId(id);
  alunoRepository.excluir(id);
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir,
  cpfValido,
  limparCpf,
};