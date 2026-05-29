const express = require('express');
const router = express.Router();
const planoController = require('../controllers/planoController');
const authMiddleware = require('../middlewares/authMiddleware');
const permissao = require('../middlewares/permissaoMiddleware');

router.use(authMiddleware, permissao('ADMIN'));

router.get('/', planoController.listar);
router.get('/novo', planoController.exibirForm);
router.post('/', planoController.criar);
router.get('/:id/editar', planoController.exibirForm);
router.put('/:id', planoController.atualizar);
router.delete('/:id', planoController.excluir);

module.exports = router;
