const express = require('express');
const router = express.Router();
const matriculaController = require('../controllers/matriculaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', matriculaController.listar);
router.get('/nova', matriculaController.exibirForm);
router.post('/', matriculaController.criar);
router.put('/:id/cancelar', matriculaController.cancelar);
router.get('/:id', matriculaController.detalhar);

module.exports = router;
