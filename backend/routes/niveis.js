const express = require('express');
const router = express.Router();
const niveisController = require('../controllers/niveisController');

router.get('/', niveisController.listarNiveis);
router.post('/', niveisController.cadastrarNivel);
router.put('/:id', niveisController.editarNivel);
router.delete('/:id', niveisController.removerNivel);

module.exports = router;
