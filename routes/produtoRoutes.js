const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/ProdutoController');

// Caminhos das requisições mapeados para o Controller
router.get('/', produtoController.listar);
router.get('/novo', produtoController.exibirFormularioCadastro);
router.post('/novo', produtoController.cadastrar);

module.exports = router;