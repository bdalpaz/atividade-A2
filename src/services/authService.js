const bcrypt = require('bcryptjs');
const usuarioRepository = require('../repositories/usuarioRepository');

function autenticar(email, senha) {
  if (!email || !senha) {
    throw new Error('Informe e-mail e senha.');
  }

  const usuario = usuarioRepository.buscarPorEmail(email.trim().toLowerCase());
  if (!usuario) {
    throw new Error('E-mail ou senha inválidos.');
  }

  const senhaConfere = bcrypt.compareSync(senha, usuario.senha_hash);
  if (!senhaConfere) {
    throw new Error('E-mail ou senha inválidos.');
  }

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    perfil: usuario.perfil,
  };
}

module.exports = { autenticar };