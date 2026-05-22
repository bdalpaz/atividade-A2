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

### Matrículas
| Método | URL | Controller | Finalidade |
|---|---|---|---|
| GET | /matriculas | matriculaController.listar | Lista matrículas (filtro por status, aluno) |
| GET | /matriculas/nova | matriculaController.exibirForm | Renderiza formulário de nova matrícula |
| POST | /matriculas | matriculaController.criar | Cria nova matrícula (aplica regra de negócio) |
| PUT | /matriculas/:id/cancelar | matriculaController.cancelar | Cancela uma matrícula ativa |
| GET | /matriculas/:id | matriculaController.detalhar | Exibe detalhes de uma matrícula |

### Catraca
| Método | URL | Controller | Finalidade |
|---|---|---|---|
| GET | /catraca | catracaController.exibirTela | Renderiza tela de liberação por CPF |
| POST | /catraca/liberar | catracaController.validarAcesso | Valida CPF e exibe resultado (liberado/bloqueado) |

---

## 🛡️ Rotas Privadas com Perfil Restrito

### Planos (apenas perfil ADMIN)
| Método | URL | Controller | Finalidade |
|---|---|---|---|
| GET | /planos | planoController.listar | Lista todos os planos |
| GET | /planos/novo | planoController.exibirForm | Renderiza formulário de cadastro |
| POST | /planos | planoController.criar | Cria um novo plano |
| GET | /planos/:id/editar | planoController.exibirForm | Renderiza formulário de edição |
| PUT | /planos/:id | planoController.atualizar | Atualiza um plano existente |
| DELETE | /planos/:id | planoController.excluir | Exclui um plano |

### Alunos (operação restrita a ADMIN)
| Método | URL | Controller | Finalidade |
|---|---|---|---|
| DELETE | /alunos/:id | alunoController.excluir | Exclui um aluno (apenas ADMIN) |

---

## ⚠️ Rotas de Erro

| Método | URL | Renderiza | Finalidade |
|---|---|---|---|
| GET | * (qualquer) | erros/404.ejs | Página de rota não encontrada |
| — | (interno) | erros/403.ejs | Página de acesso negado (acionada pelo permissaoMiddleware) |

---

## Resumo Quantitativo
- *Rotas públicas:* 3 (login GET/POST, raiz)
- *Rotas privadas (qualquer perfil):* 14
- *Rotas privadas (apenas ADMIN):* 7
- *Total:* 24 rotas funcionais + páginas de erro