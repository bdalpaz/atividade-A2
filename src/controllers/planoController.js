
const planoService = require('../services/planoService');

function listar(req, res) {
  const planos = planoService.listar();
  res.render('planos/lista', {
    titulo: 'Planos',
    usuario: req.session.usuario,
    planos,
    sucesso: req.query.sucesso || null,
  });
}

function exibirForm(req, res) {
  const id = req.params.id;
  let plano = { id: null, nome: '', duracao_meses: '', valor: '', descricao: '', ativo: 1 };
  if (id) {
    try {
      plano = planoService.buscarPorId(id);
    } catch (err) {
      return res.status(404).render('erros/404', {
        titulo: 'Não encontrado',
        usuario: req.session.usuario,
      });
    }
  }
  res.render('planos/form', {
    titulo: id ? 'Editar plano' : 'Novo plano',
    usuario: req.session.usuario,
    plano,
    erro: null,
  });
}

function criar(req, res) {
  try {
    planoService.criar(req.body);
    res.redirect('/planos?sucesso=Plano cadastrado com sucesso.');
  } catch (err) {
    res.status(400).render('planos/form', {
      titulo: 'Novo plano',
      usuario: req.session.usuario,
      plano: { id: null, ...req.body },
      erro: err.message,
    });
  }
}

function atualizar(req, res) {
  try {
    planoService.atualizar(req.params.id, req.body);
    res.redirect('/planos?sucesso=Plano atualizado com sucesso.');
  } catch (err) {
    res.status(400).render('planos/form', {
      titulo: 'Editar plano',
      usuario: req.session.usuario,
      plano: { id: req.params.id, ...req.body },
      erro: err.message,
    });
  }
}

function excluir(req, res) {
  try {
    planoService.excluir(req.params.id);
    res.redirect('/planos?sucesso=Plano excluído com sucesso.');
  } catch (err) {
    res.status(400).render('erros/404', {
      titulo: 'Erro',
      usuario: req.session.usuario,
    });
  }
}

module.exports = { listar, exibirForm, criar, atualizar, excluir };
