const path = require("path");
const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");

const database = require("./src/config/database");

const authRoutes = require("./src/routes/authRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const alunoRoutes = require("./src/routes/alunoRoutes");
const planoRoutes = require("./src/routes/planoRoutes");
const matriculaRoutes = require("./src/routes/matriculaRoutes");
const catracaRoutes = require("./src/routes/catracaRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "AcademiaTopDasTops-secret-dev",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 4 }, // 4 horas
  }),
);

app.use((req, res, next) => {
  res.locals.usuarioLogado = req.session.usuario || null;
  next();
});

app.use("/", authRoutes);
app.use("/", dashboardRoutes);
app.use("/alunos", alunoRoutes);
app.use("/planos", planoRoutes);
app.use("/matriculas", matriculaRoutes);
app.use("/catraca", catracaRoutes);

app.use((req, res) => {
  res.status(404).render("erros/404", {
    titulo: "Não encontrado",
    usuario: req.session.usuario || null,
  });
});

app.use((err, req, res, next) => {
  console.error("Erro não tratado:", err);
  res.status(500).render("erros/404", {
    titulo: "Erro interno",
    usuario: req.session.usuario || null,
  });
});

database
  .init()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Academia Top Das Tops rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Falha ao inicializar o banco de dados:", err);
    process.exit(1);
  });

module.exports = app;
