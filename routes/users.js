const express = require('express');
const router = express.Router();

/* GET página de cadastro de usuário. */
router.get('/cadastro', function(req, res, next) {
  res.render('usuario/cadastro');
});

module.exports = router;
