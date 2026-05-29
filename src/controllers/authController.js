
const authService = require('../services/authService');

function redirectInicial(req, res) {
  if (req.session && req.session.usuario) {
    return res.redirect('/dashboard');
  }
  return res.redirect('/login');
}

function exibirLogin(req, res) {
  if (req.session && req.session.usuario) {
    return res.redirect('/dashboard');
  }
  res.render('auth/login', { titulo: 'Login', erro: null, email: '' });
}

function autenticar(req, res) {
  const { email, senha } = req.body;
  try {
    const usuario = authService.autenticar(email, senha);
    req.session.usuario = usuario;
    return res.redirect('/dashboard');
  } catch (err) {
    return res.status(401).render('auth/login', {
      titulo: 'Login',
      erro: err.message,
      email: email || '',
    });
  }
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/login');
  });
}

module.exports = { redirectInicial, exibirLogin, autenticar, logout };
