## Visão Geral
O *GymControl* é construído sobre uma arquitetura web em *camadas*, na qual cada nível possui uma responsabilidade única e bem delimitada. O fluxo de uma requisição HTTP percorre obrigatoriamente as camadas na seguinte ordem:


ROUTES → CONTROLLERS → SERVICES → REPOSITORIES → DATABASE


A separação garante:
- *Baixo acoplamento*: trocar o banco (SQLite por outro) impacta apenas a camada de repository.
- *Alta coesão*: cada arquivo tem um propósito claro.
- *Testabilidade*: services podem ser testados isolados do Express.
- *Reuso*: a mesma regra de negócio atende diferentes rotas/views.

## Stack Tecnológica
| Camada | Tecnologia |
|---|---|
| Runtime | Node.js |
| Framework HTTP | Express |
| View Engine | EJS |
| Banco de Dados | SQLite via sql.js |
| Autenticação | bcryptjs + express-session |
| Utilitários | method-override (para PUT/DELETE via formulário) |

## Estrutura de Pastas


academia/
├── server.js                  # Bootstrap: Express, sessão, middlewares globais, rotas
├── package.json
├── database/
│   └── academia.db            # Arquivo SQLite persistente
├── src/
│   ├── config/
│   │   └── database.js        # Conexão e inicialização do banco
│   ├── routes/
│   │   ├── authRoutes.js      # /login, /logout
│   │   ├── alunoRoutes.js     # /alunos
│   │   ├── planoRoutes.js     # /planos
│   │   ├── matriculaRoutes.js # /matriculas
│   │   ├── catracaRoutes.js   # /catraca
│   │   └── dashboardRoutes.js # /dashboard
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── alunoController.js
│   │   ├── planoController.js
│   │   ├── matriculaController.js
│   │   ├── catracaController.js
│   │   └── dashboardController.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── alunoService.js
│   │   ├── planoService.js
│   │   ├── matriculaService.js
│   │   └── catracaService.js
│   ├── repositories/
│   │   ├── usuarioRepository.js
│   │   ├── alunoRepository.js
│   │   ├── planoRepository.js
│   │   └── matriculaRepository.js
│   ├── middlewares/
│   │   ├── authMiddleware.js     # Garante usuário logado
│   │   └── permissaoMiddleware.js # Garante perfil ADMIN/RECEPCAO
│   └── views/
│       ├── partials/             # header, footer, menu
│       ├── auth/                 # login.ejs
│       ├── alunos/               # lista.ejs, form.ejs
│       ├── planos/               # lista.ejs, form.ejs
│       ├── matriculas/           # lista.ejs, form.ejs
│       ├── catraca/              # liberar.ejs, resultado.ejs
│       ├── dashboard.ejs
│       └── erros/                # 403.ejs, 404.ejs
└── public/
    ├── css/
    │   └── styles.css
    └── js/
        └── scripts.js
