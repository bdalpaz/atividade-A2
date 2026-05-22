# Quebra de Tarefas da Equipe

## Integrantes
| Integrante | Função Principal |
|---|---|
| Alice Botton Dal Paz | Backend / Arquitetura geral e camada de Service |
| Anthony Guilherme Cazuni da Silva | Backend / Camada de Repository e Banco de Dados |
| Gabriel Henrique Robette Ferri | Frontend / Views EJS, CSS e integração com Controllers |

## Critérios de Divisão
A divisão respeita afinidades técnicas declaradas pelos integrantes, mas garante que **todos os três participem do planejamento** (descrição, protótipos, fluxos, arquitetura) e que **revisões cruzadas** sejam feitas — ninguém merge a própria PR sem aprovação de outro integrante.

## Responsabilidades por Componente

### Etapa 1 — Planejamento (entrega atual)
| Tarefa | Responsável Principal | Apoio |
|---|---|---|
| `descricao.md` | Alice | Anthony, Gabriel |
| `arquitetura.md` | Anthony | Alice |
| `rotas.md` | Gabriel | Anthony |
| `tarefas.md` | Alice | Gabriel |
| `prototipos.pdf` | Gabriel | Alice |
| `fluxo.pdf` | Anthony | Gabriel |
| Revisão final e organização do repositório | Todos | — |

### Etapa 2 — Implementação (entrega futura)

#### Alice — Camada de Service e Regras de Negócio
- `services/authService.js` (validação de credenciais, hash bcrypt)
- `services/alunoService.js` (validações de CPF, e-mail, idade)
- `services/matriculaService.js` — **regra de negócio principal** (bloqueio de matrícula duplicada)
- `services/planoService.js` e `services/catracaService.js`
- Testes manuais das regras de negócio

#### Anthony — Camada de Repository e Banco
- `config/database.js` (inicialização do SQLite)
- Scripts de criação de tabelas e seeds (usuários demo, planos iniciais)
- `repositories/usuarioRepository.js`, `alunoRepository.js`, `planoRepository.js`, `matriculaRepository.js`
- Middlewares `authMiddleware.js` e `permissaoMiddleware.js`
- Configuração de sessão em `server.js`

#### Gabriel — Views, Estilos e Controllers
- Todas as views EJS (`auth/`, `alunos/`, `planos/`, `matriculas/`, `catraca/`, `dashboard.ejs`, `erros/`)
- Partials reutilizáveis (`header`, `footer`, `menu`)
- Estilos em `public/css/styles.css`
- Scripts de cliente em `public/js/scripts.js` (máscaras de CPF, validações simples)
- Controllers, integrando requisição com os services da Alice

### Tarefas Compartilhadas
- Definição de rotas em `src/routes/*` — co-autoria de Gabriel e Anthony.
- Revisão de código entre pares antes de cada merge.
- Testes manuais de fluxo completo antes da entrega.

## Cronograma

### Etapa 1 — Planejamento (22/05/2026)

| Horário | Atividade | Responsável |
|---|---|---|
| 08:00 – 09:30 | Reunião inicial: alinhamento do tema e definição das entidades | Todos |
| 09:30 – 11:00 | Redação de `descricao.md` | Alice |
| 09:30 – 11:00 | Diagrama ER e estrutura de pastas em `arquitetura.md` | Anthony |
| 09:30 – 11:00 | Esboço das telas em ferramenta de wireframe | Gabriel |
| 11:00 – 12:30 | Mapeamento e redação de `rotas.md` | Gabriel |
| 11:00 – 12:30 | Detalhamento das camadas em `arquitetura.md` | Anthony |
| 11:00 – 12:30 | Redação de `tarefas.md` com cronograma | Alice |
| 14:00 – 15:30 | Construção do `fluxo.pdf` (fluxogramas) | Anthony |
| 14:00 – 15:30 | Finalização dos protótipos e exportação para `prototipos.pdf` | Gabriel |
| 15:30 – 16:30 | Revisão cruzada de todos os documentos | Todos |
| 16:30 – 17:00 | Organização final do repositório, commits e push | Todos |

### Etapa 2 — Implementação (após entrega da Etapa 1)

| Período | Atividade | Responsável |
|---|---|---|
| Semana 1 | Setup do projeto Node/Express, banco SQLite, seed inicial | Anthony |
| Semana 1 | Criação das views base e estilos | Gabriel |
| Semana 1 | Implementação do authService e middlewares de sessão | Alice |
| Semana 2 | CRUD de alunos (repository → service → controller → view) | Trio |
| Semana 2 | CRUD de planos com restrição de perfil | Trio |
| Semana 3 | Matrículas + regra de negócio principal | Alice (service) + Anthony (repo) + Gabriel (view) |
| Semana 3 | Módulo de catraca | Trio |
| Semana 4 | Testes manuais, ajustes de UX, documentação final | Todos |

## Comunicação e Versionamento
- **Reuniões diárias rápidas** (~15 minutos) para alinhamento.
- **Branches por feature** (`feature/alunos-crud`, `feature/matricula-regra`, etc.).
- **Pull Requests obrigatórios** com revisão de ao menos um outro integrante.
- **Commits descritivos** seguindo convenção `tipo: descrição` (ex.: `feat: adiciona service de matrícula`, `docs: atualiza rotas.md`).