const express = require('express');
const router = express.Router();
const desenvolvedoresController = require('../controllers/desenvolvedoresController');
const desenvolvedoresNiveisController = require('../controllers/desenvolvedoresNiveisController');

router.get('/', desenvolvedoresController.listarDesenvolvedores);
router.post('/', desenvolvedoresController.cadastrarDesenvolvedor);
router.put('/:id', desenvolvedoresController.editarDesenvolvedor);
router.patch('/:id', desenvolvedoresController.editarDesenvolvedor);
router.delete('/:id', desenvolvedoresController.removerDesenvolvedor);
router.get('/nivel/:nivelId', desenvolvedoresNiveisController.listarDesenvolvedoresPorNivel);

module.exports = router;
