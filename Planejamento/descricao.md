# Descrição do Projeto

## Nome do Sistema
**Academia top das tops** — Sistema de Controle de Academia

## Tema Escolhido
Gerenciamento administrativo de uma academia de musculação, abrangendo o cadastro de alunos, controle de planos comerciais, matrículas vigentes e liberação de acesso (catraca) por meio de validação de CPF.

## Objetivo do Sistema
Oferecer uma ferramenta web simples, segura e organizada para que funcionários de uma academia possam administrar a rotina operacional do estabelecimento, controlando quem são os alunos ativos, quais planos contrataram, até quando suas matrículas são válidas e se possuem permissão para entrar no estabelecimento em um determinado momento.

O sistema busca substituir controles informais (planilhas, anotações em papel) por um fluxo digital com regras de negócio bem definidas, autenticação por perfil e auditoria de operações.

## Descrição Geral do Funcionamento
O GymControl é uma aplicação web acessada pelo navegador, na qual os funcionários da academia realizam login com e-mail e senha. A partir do perfil do usuário autenticado (ADMIN ou RECEPÇÃO), o sistema libera diferentes funcionalidades por meio de middlewares de permissionamento.

Após o login, o usuário visualiza um dashboard com os principais indicadores da academia (alunos ativos, matrículas vigentes, planos disponíveis) e pode navegar pelas áreas de gestão de alunos, planos e matrículas. Há também um módulo de catraca, que simula a liberação de acesso de um aluno a partir do seu CPF: o sistema verifica se existe uma matrícula ativa e dentro do prazo de vigência antes de autorizar a entrada.

A aplicação segue uma arquitetura em camadas (Controller → Service → Repository), com sessões via `express-session`, banco SQLite e renderização de views com EJS.