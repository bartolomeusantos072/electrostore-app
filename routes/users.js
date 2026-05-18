const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Usuario } = require('../models');

router.get('/login', (req, res) => {
  res.status(200).render('login');
});

router.get('/cadastro', (req, res) => {
  res.setHeader('Cache-Control', 'private, max-age=31536000');
  res.status(200).render('usuario/cadastro');
});

router.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha, perfil } = req.body;
    
    if (!nome || !email || !senha) {
      return res.status(400).render('usuario/cadastro', { 
        error_message: 'Todos os campos são obrigatórios!' 
      });
    }
    
    await Usuario.create({
      nome,
      email,
      senha_hash: senha,
      perfil: perfil || 'usuario' 
    });
    
    res.redirect('/users/login');
  } catch (error) {
    res.status(500).render('usuario/cadastro', { 
      error_message: 'Erro ao criar conta ou e-mail já existente.' 
    });
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}));

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;