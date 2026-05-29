
const catracaService = require('../services/catracaService');

function exibirTela(req, res) {
  res.render('catraca/liberar', {
    titulo: 'Catraca',
    usuario: req.session.usuario,
    erro: null,
    cpf: '',
  });
}

function validarAcesso(req, res) {
  const cpf = req.body.cpf || '';
  try {
    const resultado = catracaService.validarAcesso(cpf);
    res.render('catraca/resultado', {
      titulo: 'Resultado da catraca',
      usuario: req.session.usuario,
      resultado,
      cpf,
    });
  } catch (err) {
    res.status(400).render('catraca/liberar', {
      titulo: 'Catraca',
      usuario: req.session.usuario,
      erro: err.message,
      cpf,
    });
  }
}

module.exports = { exibirTela, validarAcesso };
