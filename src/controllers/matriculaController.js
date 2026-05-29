
const matriculaService = require('../services/matriculaService');
const alunoService = require('../services/alunoService');
const planoService = require('../services/planoService');

function listar(req, res) {
  const filtroStatus = req.query.status || '';
  const matriculas = matriculaService.listar(filtroStatus);
  res.render('matriculas/lista', {
    titulo: 'Matrículas',
    usuario: req.session.usuario,
    matriculas,
    filtroStatus,
    hoje: matriculaService.hojeISO(),
    sucesso: req.query.sucesso || null,
  });
}

function exibirForm(req, res) {
  res.render('matriculas/form', {
    titulo: 'Nova matrícula',
    usuario: req.session.usuario,
    alunos: alunoService.listar(''),
    planos: planoService.listarAtivos(),
    selecionado: { aluno_id: '', plano_id: '', data_inicio: matriculaService.hojeISO() },
    erro: null,
  });
}

function detalhar(req, res) {
  try {
    const matricula = matriculaService.buscarPorId(req.params.id);
    res.render('matriculas/detalhe', {
      titulo: 'Detalhes da matrícula',
      usuario: req.session.usuario,
      matricula,
      hoje: matriculaService.hojeISO(),
    });
  } catch (err) {
    res.status(404).render('erros/404', {
      titulo: 'Não encontrado',
      usuario: req.session.usuario,
    });
  }
}

function criar(req, res) {
  try {
    matriculaService.criar(req.body);
    res.redirect('/matriculas?sucesso=Matrícula criada com sucesso.');
  } catch (err) {
    res.status(400).render('matriculas/form', {
      titulo: 'Nova matrícula',
      usuario: req.session.usuario,
      alunos: alunoService.listar(''),
      planos: planoService.listarAtivos(),
      selecionado: { ...req.body },
      erro: err.message,
    });
  }
}

function cancelar(req, res) {
  try {
    matriculaService.cancelar(req.params.id);
    res.redirect('/matriculas?sucesso=Matrícula cancelada.');
  } catch (err) {
    res.redirect('/matriculas?sucesso=' + encodeURIComponent(err.message));
  }
}

module.exports = { listar, exibirForm, detalhar, criar, cancelar };
