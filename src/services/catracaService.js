const matriculaRepository = require('../repositories/matriculaRepository');
const alunoRepository = require('../repositories/alunoRepository');
const matriculaService = require('./matriculaService');
const alunoService = require('./alunoService');

function validarAcesso(cpfBruto) {
  const cpf = alunoService.limparCpf(cpfBruto);

  if (cpf.length !== 11) {
    throw new Error('Informe um CPF com 11 dígitos.');
  }

  const aluno = alunoRepository.buscarPorCpf(cpf);
  if (!aluno) {
    return {
      liberado: false,
      motivo: 'Aluno não encontrado para o CPF informado.',
    };
  }

  const matricula = matriculaRepository.buscarAtivaVigentePorCpf(
    cpf,
    matriculaService.hojeISO()
  );

  if (!matricula) {
    return {
      liberado: false,
      motivo: 'Aluno sem matrícula ativa e vigente. Acesso bloqueado.',
      aluno,
    };
  }

  return {
    liberado: true,
    motivo: 'Acesso liberado. Bom treino!',
    aluno,
    matricula,
  };
}

module.exports = { validarAcesso };