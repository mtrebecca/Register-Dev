const express = require('express');
const router = express.Router();
const { listarDesenvolvedoresPorNivel, listarNiveisComQuantidade } = require('../controllers/desenvolvedoresNiveisController');

router.get('/nivel/:nivelId', listarDesenvolvedoresPorNivel);
router.get('/niveisComQuantidade', listarNiveisComQuantidade);

module.exports = router;
