const express = require('express');
const router = express.Router();
const desenvolvedoresNiveisController = require('../controllers/desenvolvedoresNiveisController');

router.get('/nivel/:nivelId', desenvolvedoresNiveisController.listarDesenvolvedoresPorNivel);
router.get('/niveisComQuantidade', desenvolvedoresNiveisController.listarNiveisComQuantidade);

module.exports = router;
