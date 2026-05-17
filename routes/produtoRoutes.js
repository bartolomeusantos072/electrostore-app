const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/ProdutoController');

// Caminhos das requisições mapeados para o Controller
router.get('/', produtoController.listar);
router.get('/novo', produtoController.exibirFormularioCadastro);
router.post('/novo', produtoController.cadastrar);

module.exports = router;const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/ProdutoController');

function ehAutenticado(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); 
    }
    res.status(401).redirect('/users/login'); 
}

function ehAdminOuGerente(req, res, next) {

    if (req.user && (req.user.perfil === 'admin' || req.user.perfil === 'gerente')) {
        return next(); 
    }

    res.status(403).render('error', { 
        message: 'Acesso Negado: A criação de produtos é restrita a administradores ou gerentes.' 
    });
}


router.get('/', produtoController.listar);

router.get('/novo', ehAutenticado, ehAdminOuGerente, produtoController.exibirFormularioCadastro);
router.post('/novo', ehAutenticado, ehAdminOuGerente, produtoController.cadastrar);

module.exports = router;