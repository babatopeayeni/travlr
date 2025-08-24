var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs'); // Imported hbs (Update)

// importing the routes defined inside app_server/routes (Update)
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel')
var contactRouter = require('./app_server/routes/contact')
var aboutRouter = require('./app_server/routes/about')
var mealsRouter = require('./app_server/routes/meals')
var newsRouter = require('./app_server/routes/news')
var roomsRouter = require('./app_server/routes/rooms')




var app = express();

// view engine setup (Update)
app.set('views', path.join(__dirname,'app_server','views'));
app.set('view engine', 'hbs');

// register handlebars partials(https://www.npmjs.com/package/hbs) (Update)
hbs.registerPartials(path.join(__dirname, 'app_server','views/partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Assigning the route path to the routes imported (Update)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/meals', mealsRouter);
app.use('/news', newsRouter);
app.use('/rooms', roomsRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
