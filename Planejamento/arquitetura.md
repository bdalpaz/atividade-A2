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

## Responsabilidades das Camadas

### Routes (src/routes/)
- Definem as URLs (endpoints) da aplicação e o método HTTP de cada uma.
- Aplicam middlewares de autenticação (authMiddleware) e de permissão (permissaoMiddleware).
- Encaminham a requisição para o controller correspondente.
- *Não contêm lógica de negócio nem acesso a banco.*

Exemplo:
js
router.get('/alunos', authMiddleware, alunoController.listar);
router.post('/planos', authMiddleware, permissao('ADMIN'), planoController.criar);


### Controllers (src/controllers/)
- Recebem req e res do Express.
- Extraem dados da requisição (req.body, req.params, req.query, req.session).
- Chamam o *service* apropriado.
- Tratam erros lançados pelo service e renderizam a view (ou redirecionam).
- *Não contêm regras de negócio nem SQL.*

### Services (src/services/)
- Concentram *toda a lógica de negócio* do sistema.
- Validam dados (formato de CPF, e-mail, datas).
- Aplicam regras (ex.: bloqueio de matrícula duplicada vigente).
- Compõem operações que envolvem múltiplos repositórios.
- Lançam erros descritivos que serão capturados pelos controllers.
- *Não conhecem req/res nem SQL.*

### Repositories (src/repositories/)
- *Única camada que conversa com o banco de dados.*
- Encapsulam comandos SQL (SELECT, INSERT, UPDATE, DELETE).
- Retornam objetos JavaScript puros (ou null quando não há registro).
- *Não validam regras de negócio.*

### Middlewares (src/middlewares/)
- *authMiddleware*: verifica se existe req.session.usuario. Se não houver, redireciona para /login.
- *permissaoMiddleware(perfil)*: factory que retorna um middleware verificando se req.session.usuario.perfil === perfil. Caso contrário, renderiza a página 403.ejs.

### Views (src/views/)
- Templates EJS renderizados pelos controllers.
- Recebem dados via variáveis e exibem ao usuário.
- Podem conter pequenos blocos de JS de cliente para interações simples (filtros, máscaras de input).

## Organização das Rotas

As rotas são separadas em arquivos por contexto (authRoutes, alunoRoutes, etc.) e agrupadas em *públicas* e *privadas*:

### Rotas Públicas
Não exigem sessão ativa. Acessíveis a qualquer visitante.
- /login (GET e POST)
- Recursos estáticos: /css/*, /js/*

### Rotas Privadas (exigem authMiddleware)
Exigem sessão ativa de qualquer perfil.
- /dashboard
- /alunos (listagem, formulário, criação, edição)
- /matriculas (listagem, criação, cancelamento)
- /catraca (liberação por CPF)
- /logout

### Rotas Privadas com Perfil Restrito (exigem permissaoMiddleware('ADMIN'))
- /planos/* (todas as operações)
- DELETE /alunos/:id (exclusão de aluno)

> O detalhamento completo de cada rota está documentado em rotas.md.
