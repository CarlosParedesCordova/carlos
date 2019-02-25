var createError = require('http-errors');
var express = require('express');
require('dotenv').config;
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var exphbs = require('express-handlebars');
var app = express();
var flash = require('connect-flash');
//For Handlebars
app.set('views', './views');
app.engine('hbs', exphbs({
    extname: '.hbs',
    partialsDir: [
        'views'
    ]
}));


app.set('view engine', '.hbs');
app.use(logger('dev'));

app.use(session({
    secret: 'carlos',
    resave: true,
    saveUnitialized: true

}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);




var models = require('./models');
models.sequelize.sync().then(() => {
    console.log("Se ha conectado la BD");
}).catch(err => {
    console.log(err, "Hubo un error");
});

require('./controllers/datos/insert_rol');
require('./config/passport/passport.js')(passport, models.cuenta, models.usuario, models.rol);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
