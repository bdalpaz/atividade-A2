const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
const authMiddleware = require('../middlewares/authMiddleware');
const permissao = require('../middlewares/permissaoMiddleware');

// Todas as rotas de aluno exigem usuário autenticado.
router.use(authMiddleware);

router.get('/', alunoController.listar);
router.get('/novo', alunoController.exibirForm);
router.post('/', alunoController.criar);
router.get('/:id/editar', alunoController.exibirForm);
router.put('/:id', alunoController.atualizar);
router.delete('/:id', permissao('ADMIN'), alunoController.excluir);
router.get('/:id', alunoController.detalhar);

module.exports = router;
