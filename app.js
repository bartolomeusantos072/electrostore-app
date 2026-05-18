var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var session = require('express-session');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var produtoRoutes = require('./routes/produtoRoutes');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

hbs.registerHelper('eq', function (a, b) {
    return a === b;
});

hbs.registerHelper('gt', function (a, b) {
    return a > b;
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'electrostore_secret_key_rossini',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require('passport-local').Strategy;
const { Usuario } = require('./models');

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'senha' }, async (email, senha, done) => {
    try {
        const user = await Usuario.findOne({ where: { email } });
        if (!user || user.senha_hash !== senha) { 
            return done(null, false, { message: 'Credenciais inválidas.' });
        }
        return done(null, user);
    } catch (err) { return done(err); }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await Usuario.findByPk(id);
        done(null, user);
    } catch (err) { done(err); }
});

app.use((req, res, next) => {
    res.locals.user = req.user ? req.user.get({ plain: true }) : null;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/produtos', produtoRoutes);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;