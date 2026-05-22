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