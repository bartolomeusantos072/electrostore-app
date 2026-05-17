var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');                      // <-- CORREÇÃO 1: Importação do HBS para helpers e partials
var session = require('express-session');      // <-- CORREÇÃO 2: Importação necessária para Sessão
var passport = require('passport');            // <-- CORREÇÃO 3: Importação do Passport

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var produtoRoutes = require('./routes/produtoRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// CORREÇÃO 4: Registro do Helper lógico 'eq' exigido para controle visual de perfis nas views
hbs.registerHelper('eq', function (a, b) {
    return a === b;
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORREÇÃO 5: Configuração da Sessão HTTP com tempo de expiração do cookie (24h)
app.use(session({
    secret: 'electrostore_secret_key_rossini',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// CORREÇÃO 6: Inicialização obrigatória dos middlewares do Passport
app.use(passport.initialize());
app.use(passport.session());

// CONFIGURAÇÃO DA ESTRATÉGIA LOCAL (Coloque aqui ou vincule ao seu arquivo de configuração)
const LocalStrategy = require('passport-local').Strategy;
const { usuario } = require('./models'); // Certifique-se de que o nome do modelo bate com models/index.js

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'senha' }, async (email, senha, done) => {
    try {
        const user = await usuario.findOne({ where: { email } });
        if (!user || user.senha !== senha) { 
            return done(null, false, { message: 'Credenciais inválidas.' });
        }
        return done(null, user);
    } catch (err) { return done(err); }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await usuario.findByPk(id);
        done(null, user);
    } catch (err) { done(err); }
});

// CORREÇÃO 7: Middleware Global para Injeção de Usuário nas Views e Limpeza Rigorosa de Cache HTTP
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/produtos', produtoRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;