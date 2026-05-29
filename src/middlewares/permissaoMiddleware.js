module.exports = function permissao(...perfisPermitidos) {
  return function (req, res, next) {
    const usuario = req.session && req.session.usuario;

    if (!usuario) {
      return res.redirect("/login");
    }

    if (perfisPermitidos.includes(usuario.perfil)) {
      return next();
    }

    return res.status(403).render("erros/403", {
      titulo: "Acesso negado",
      usuario,
    });
  };
};
