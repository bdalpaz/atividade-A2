# Definição das Rotas

Este documento lista todas as rotas HTTP do sistema *GymControl*, separadas por nível de acesso.

## Convenções
- *Público*: acessível sem autenticação.
- *Privado*: exige sessão ativa (authMiddleware).
- *Privado + Perfil*: além de sessão ativa, exige perfil específico (permissaoMiddleware).

---

## 🌐 Rotas Públicas

| Método | URL | Controller | Finalidade |
|---|---|---|---|
| GET | / | authController.redirectInicial | Redireciona para /login ou /dashboard conforme sessão |
| GET | /login | authController.exibirLogin | Renderiza a tela de login |
| POST | /login | authController.autenticar | Processa credenciais e cria sessão |
| GET | /css/* | (estático) | Arquivos de estilo |
| GET | /js/* | (estático) | Scripts de cliente |

---

## 🔒 Rotas Privadas (qualquer perfil autenticado)

### Sessão
| Método | URL | Controller | Finalidade |
|---|---|---|---|
| POST | /logout | authController.logout | Destrói a sessão e redireciona para /login |

### Dashboard
| Método | URL | Controller | Finalidade |
|---|---|---|---|
| GET | /dashboard | dashboardController.exibir | Tela inicial com indicadores e atalhos |

### Alunos
| Método | URL | Controller | Finalidade |
|---|---|---|---|
| GET | /alunos | alunoController.listar | Lista todos os alunos (com filtro por nome/CPF) |
| GET | /alunos/novo | alunoController.exibirForm | Renderiza formulário de cadastro |
| POST | /alunos | alunoController.criar | Cria um novo aluno |
| GET | /alunos/:id/editar | alunoController.exibirForm | Renderiza formulário de edição |
| PUT | /alunos/:id | alunoController.atualizar | Atualiza dados do aluno |
| GET | /alunos/:id | alunoController.detalhar | Exibe detalhes de um aluno específico |