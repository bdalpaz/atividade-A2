const express = require('express');
const router = express.Router();
const catracaController = require('../controllers/catracaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', catracaController.exibirTela);
router.post('/liberar', catracaController.validarAcesso);

module.exports = router;
