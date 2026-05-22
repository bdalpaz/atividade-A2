# Descrição do Projeto

## Nome do Sistema
**GymControl** — Sistema de Controle de Academia

## Tema Escolhido
Gerenciamento administrativo de uma academia de musculação, abrangendo o cadastro de alunos, controle de planos comerciais, matrículas vigentes e liberação de acesso (catraca) por meio de validação de CPF.

## Objetivo do Sistema
Oferecer uma ferramenta web simples, segura e organizada para que funcionários de uma academia possam administrar a rotina operacional do estabelecimento, controlando quem são os alunos ativos, quais planos contrataram, até quando suas matrículas são válidas e se possuem permissão para entrar no estabelecimento em um determinado momento.

O sistema busca substituir controles informais (planilhas, anotações em papel) por um fluxo digital com regras de negócio bem definidas, autenticação por perfil e auditoria de operações.

## Descrição Geral do Funcionamento
O GymControl é uma aplicação web acessada pelo navegador, na qual os funcionários da academia realizam login com e-mail e senha. A partir do perfil do usuário autenticado (ADMIN ou RECEPÇÃO), o sistema libera diferentes funcionalidades por meio de middlewares de permissionamento.

Após o login, o usuário visualiza um dashboard com os principais indicadores da academia (alunos ativos, matrículas vigentes, planos disponíveis) e pode navegar pelas áreas de gestão de alunos, planos e matrículas. Há também um módulo de catraca, que simula a liberação de acesso de um aluno a partir do seu CPF: o sistema verifica se existe uma matrícula ativa e dentro do prazo de vigência antes de autorizar a entrada.

A aplicação segue uma arquitetura em camadas (Controller → Service → Repository), com sessões via `express-session`, banco SQLite e renderização de views com EJS.

## Público-Alvo
- **Proprietários e gestores de academias** de pequeno e médio porte que precisam de uma ferramenta acessível para organizar a rotina administrativa.
- **Funcionários da recepção**, que utilizam o sistema diariamente para cadastrar alunos, gerar matrículas e liberar a entrada via catraca.
- **Administradores do sistema**, responsáveis pela manutenção do catálogo de planos e por funções privilegiadas como exclusão de cadastros.

De forma indireta, o sistema também beneficia os **alunos da academia**, que passam a ter um controle confiável de seus contratos, datas de vencimento e direito de acesso ao estabelecimento.

## Funcionalidades Principais

### Autenticação e Sessão
- Login com e-mail e senha (senhas armazenadas com hash via `bcryptjs`)
- Logout e expiração de sessão
- Controle de acesso por perfil (ADMIN / RECEPÇÃO) via middleware

### Gestão de Alunos
- Cadastro de novos alunos (nome, CPF, e-mail, telefone, data de nascimento)
- Edição de dados cadastrais
- Listagem com busca por nome ou CPF
- Exclusão (restrita ao perfil ADMIN)
- Validação de CPF único

### Gestão de Planos
- Cadastro, edição e exclusão de planos comerciais (restrito ao perfil ADMIN)
- Definição de nome, duração (em meses), valor e descrição
- Listagem de planos disponíveis

### Gestão de Matrículas
- Criação de matrícula vinculando aluno e plano
- Cálculo automático da data de término com base na duração do plano
- Cancelamento de matrícula
- Listagem de matrículas ativas e históricas
- **Regra de negócio principal:** um aluno não pode possuir mais de uma matrícula ATIVA e VIGENTE simultaneamente

### Catraca (Controle de Acesso)
- Tela de liberação por CPF
- Verificação automática de matrícula ativa e dentro do prazo
- Mensagem clara em caso de bloqueio (sem matrícula, matrícula vencida ou aluno inexistente)

### Dashboard
- Indicadores resumidos: total de alunos cadastrados, matrículas ativas, planos disponíveis
- Atalhos para as principais áreas do sistema