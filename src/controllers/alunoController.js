
const alunoService = require('../services/alunoService');

function listar(req, res) {
  const filtro = req.query.busca || '';
  const alunos = alunoService.listar(filtro);
  res.render('alunos/lista', {
    titulo: 'Alunos',
    usuario: req.session.usuario,
    alunos,
    filtro,
    sucesso: req.query.sucesso || null,
  });
}

function exibirForm(req, res) {
  const id = req.params.id;
  let aluno = { id: null, nome: '', cpf: '', email: '', telefone: '', data_nascimento: '' };
  if (id) {
    try {
      aluno = alunoService.buscarPorId(id);
    } catch (err) {
      return res.status(404).render('erros/404', {
        titulo: 'Não encontrado',
        usuario: req.session.usuario,
      });
    }
  }
  res.render('alunos/form', {
    titulo: id ? 'Editar aluno' : 'Novo aluno',
    usuario: req.session.usuario,
    aluno,
    erro: null,
  });
}

function detalhar(req, res) {
  try {
    const aluno = alunoService.buscarPorId(req.params.id);
    res.render('alunos/detalhe', {
      titulo: 'Detalhes do aluno',
      usuario: req.session.usuario,
      aluno,
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
    alunoService.criar(req.body);
    res.redirect('/alunos?sucesso=Aluno cadastrado com sucesso.');
  } catch (err) {
    res.status(400).render('alunos/form', {
      titulo: 'Novo aluno',
      usuario: req.session.usuario,
      aluno: { id: null, ...req.body },
      erro: err.message,
    });
  }
}

function atualizar(req, res) {
  try {
    alunoService.atualizar(req.params.id, req.body);
    res.redirect('/alunos?sucesso=Aluno atualizado com sucesso.');
  } catch (err) {
    res.status(400).render('alunos/form', {
      titulo: 'Editar aluno',
      usuario: req.session.usuario,
      aluno: { id: req.params.id, ...req.body },
      erro: err.message,
    });
  }
}

function excluir(req, res) {
  try {
    alunoService.excluir(req.params.id);
    res.redirect('/alunos?sucesso=Aluno excluído com sucesso.');
  } catch (err) {
    res.status(400).render('erros/404', {
      titulo: 'Erro',
      usuario: req.session.usuario,
    });
  }
}

module.exports = { listar, exibirForm, detalhar, criar, atualizar, excluir };
