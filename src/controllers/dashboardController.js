
const alunoRepository = require('../repositories/alunoRepository');
const planoRepository = require('../repositories/planoRepository');
const matriculaRepository = require('../repositories/matriculaRepository');
const matriculaService = require('../services/matriculaService');

function exibir(req, res) {
  const indicadores = {
    totalAlunos: alunoRepository.contar(),
    matriculasAtivas: matriculaRepository.contarAtivasVigentes(matriculaService.hojeISO()),
    planosDisponiveis: planoRepository.contarAtivos(),
  };

  res.render('dashboard', {
    titulo: 'Dashboard',
    usuario: req.session.usuario,
    indicadores,
  });
}

module.exports = { exibir };
