var createError   = require('http-errors');
var express       = require('express');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var logger        = require('morgan');
var hbs           = require('hbs');
var cors          = require('cors');
var passport      = require('passport');

require('dotenv').config(); // Load env FIRST

// ----- Routes -----
var indexRouter   = require('./app_server/routes/index');
var usersRouter   = require('./app_server/routes/users');   // server-side users page router
var travelRouter  = require('./app_server/routes/travel');
var apiRouter     = require('./app_api/routes/index');
var contactRouter = require('./app_server/routes/contact');
var aboutRouter   = require('./app_server/routes/about');
var mealsRouter   = require('./app_server/routes/meals');
var newsRouter    = require('./app_server/routes/news');
var roomsRouter   = require('./app_server/routes/rooms');

var app = express();

// ----- View engine -----
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials'));

// ----- DB & Models (must load before passport config) -----
require('./app_api/models/db');
require('./app_api/models/user');   // registers mongoose.model('user')

// ----- Passport (FUNCTION-EXPORT pattern) -----
require('./app_api/config/passport')(passport); // INVOKE with passport to register 'jwt'
app.use(passport.initialize());

// DEBUG: confirm strategies registered at boot (should include 'jwt')
console.log('Passport strategies on boot:',
  Object.keys(passport._strategies || {}));

// ----- Middleware -----
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* -------------- CORS (apply to /api only) -------------- */
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
/* ------------------------------------------------------- */

// ----- Routes -----
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/meals', mealsRouter);
app.use('/news', newsRouter);
app.use('/rooms', roomsRouter);

// ----- 404 -----
app.use(function (req, res, next) {
  next(createError(404));
});

// ----- Error handler -----
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
