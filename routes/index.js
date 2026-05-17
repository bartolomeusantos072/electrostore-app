const express = require('express');
const router = express.Router();
const { Produto, Categoria, Usuario } = require('../models');


router.get('/', async (req, res) => {
  try {
    
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    
    const queryOptions = { include: [Categoria, Usuario] };
    if (req.query.categoria) {
      queryOptions.where = { categoria_id: req.query.categoria };
    }

    const produtos = await Produto.findAll(queryOptions);
    res.status(200).render('produtos/index', { produtos });
  } catch (error) {
    res.status(500).render('error', { message: 'Erro ao carregar a página principal.' });
  }
});


router.get('/historia', (req, res) => {

  res.setHeader('Cache-Control', 'public, max-age=25920000, no-cache');
  res.status(200).render('historia');
});

module.exports = router;