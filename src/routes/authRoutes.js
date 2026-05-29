const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authController.redirectInicial);
router.get('/login', authController.exibirLogin);
router.post('/login', authController.autenticar);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;
