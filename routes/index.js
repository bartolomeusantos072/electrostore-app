const express = require('express');
const router = express.Router();

/* GET página inicial (Vitrine). */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET página de login. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
