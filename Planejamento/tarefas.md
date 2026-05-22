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