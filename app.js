var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var session = require('express-session');
var fileUpload = require('express-fileupload');

//var mongoUtil = require('./config/connection');



var indexRouter = require('./routes/index');
var productRouter = require('./routes/products');
var aboutRouter = require('./routes/about');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var coinRouter = require('./routes/coin');
var bidRouter = require('./routes/bid');


var part = path.join(__dirname, "/views/partials");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(part);



app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"key", cookie:{maxAge:6000000},resave: false,saveUninitialized: true}));
app.use(fileUpload());


app.use('/', indexRouter);
app.use('/products', productRouter);
app.use('/about', aboutRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/coin', coinRouter);
app.use('/bid', bidRouter);






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

