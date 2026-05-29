const matriculaRepository = require('../repositories/matriculaRepository');
const alunoRepository = require('../repositories/alunoRepository');
const planoRepository = require('../repositories/planoRepository');

function hojeISO() {
  return new Date().toISOString().slice(0, 10);
}

function calcularDataFim(dataInicioISO, meses) {
  const d = new Date(dataInicioISO + 'T00:00:00');
  d.setMonth(d.getMonth() + meses);
  return d.toISOString().slice(0, 10);
}

function listar(filtroStatus) {
  return matriculaRepository.listar(filtroStatus);
}

function buscarPorId(id) {
  const m = matriculaRepository.buscarPorId(id);
  if (!m) throw new Error('Matrícula não encontrada.');
  return m;
}

function criar(dados) {
  const alunoId = Number(dados.aluno_id);
  const planoId = Number(dados.plano_id);

  const aluno = alunoRepository.buscarPorId(alunoId);
  if (!aluno) throw new Error('Aluno informado não existe.');

  const plano = planoRepository.buscarPorId(planoId);
  if (!plano) throw new Error('Plano informado não existe.');
  if (!plano.ativo) throw new Error('Não é possível matricular em um plano inativo.');

  const dataInicio = dados.data_inicio && dados.data_inicio.trim() !== ''
    ? dados.data_inicio
    : hojeISO();

  const matriculaAtiva = matriculaRepository.buscarAtivaVigentePorAluno(alunoId, hojeISO());
  if (matriculaAtiva) {
    throw new Error('Este aluno já possui uma matrícula ativa e vigente.');
  }

  const dataFim = calcularDataFim(dataInicio, plano.duracao_meses);

  return matriculaRepository.criar({
    aluno_id: alunoId,
    plano_id: planoId,
    data_inicio: dataInicio,
    data_fim: dataFim,
  });
}

function cancelar(id) {
  const m = buscarPorId(id);
  if (m.status === 'CANCELADA') {
    throw new Error('Esta matrícula já está cancelada.');
  }
  matriculaRepository.cancelar(id);
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  cancelar,
  calcularDataFim,
  hojeISO,
};