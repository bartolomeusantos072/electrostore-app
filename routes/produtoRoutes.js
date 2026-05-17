const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/ProdutoController');
const { Produto } = require('../models');

function ehAutenticado(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).redirect('/users/login');
}

function temPerfil(perfilRequerido) {
  return (req, res, next) => {
    if (req.user && req.user.perfil === perfilRequerido) {
      return next();
    }
    res.status(403).render('error', { message: 'Acesso negado: Perfil sem autorização para esta funcionalidade.' });
  };
}

router.get('/', (req, res) => res.redirect('/'));

router.get('/novo', ehAutenticado, temPerfil('admin'), async (req, res, next) => {
  res.setHeader('Cache-Control', 'private, max-age=5184000, no-cache');
  next();
}, produtoController.exibirFormularioCadastro);

router.post('/novo', ehAutenticado, temPerfil('admin'), produtoController.cadastrar);

router.get('/consulta/:id', async (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
}, produtoController.consultar);

router.post('/venda/:id', ehAutenticado, temPerfil('lojista'), async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).render('error', { message: 'ID inválido.' });
    
    const produto = await Produto.findByPk(id);
    if (!produto) return res.status(404).render('error', { message: 'Produto não encontrado.' });
    if (produto.quantidade <= 0) return res.status(400).render('error', { message: 'Produto sem estoque.' });
    
    produto.quantidade -= 1;
    await produto.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).render('error', { message: 'Erro ao processar a venda.' });
  }
});

router.post('/compra/:id', ehAutenticado, temPerfil('lojista'), async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).render('error', { message: 'ID inválido.' });
    
    const produto = await Produto.findByPk(id);
    if (!produto) return res.status(404).render('error', { message: 'Produto não encontrado.' });
    
    produto.quantidade += 1;
    await produto.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).render('error', { message: 'Erro ao processar a compra.' });
  }
});

module.exports = router;