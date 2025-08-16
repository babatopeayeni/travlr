// app.js
var createError   = require('http-errors');
var express       = require('express');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var logger        = require('morgan');
var hbs           = require('hbs');
var cors          = require('cors'); // <-- add

// Routes
var indexRouter   = require('./app_server/routes/index');
var usersRouter   = require('./app_server/routes/users');
var travelRouter  = require('./app_server/routes/travel');
var apiRouter     = require('./app_api/routes/index');
var contactRouter = require('./app_server/routes/contact');
var aboutRouter   = require('./app_server/routes/about');
var mealsRouter   = require('./app_server/routes/meals');
var newsRouter    = require('./app_server/routes/news');
var roomsRouter   = require('./app_server/routes/rooms');

var app = express();

// view engine
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials'));

// DB
require('./app_api/models/db');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* ---------------- CORS (apply to /api only) ---------------- */
// Allow any localhost port during dev (e.g., 4200, 53559, etc.)
/* ---------------- CORS (apply to /api only) ---------------- */
// Allow any localhost port during dev (e.g., 4200, 53559, etc.)
const corsOptions = {
  origin: (origin, cb) => {
    if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
};

// Apply CORS middleware
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
}, cors(corsOptions));

app.options('/api/*', cors(corsOptions)); // handle preflight

/* ----------------------------------------------------------- */

// Mount routes BEFORE 404 handler
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/meals', mealsRouter);
app.use('/news', newsRouter);
app.use('/rooms', roomsRouter);

// 404 handler LAST
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
