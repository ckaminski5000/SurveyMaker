var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv').config();
const { connectDB } = require('./config/db');
const cors = require('cors')

const port = process.env.PORT || 3000;

var indexRouter = require('./routes/index');
var questionsRouter = require('./routes/questions');
var surveysRouter = require('./routes/surveys');
var usersRouter = require('./routes/users');


connectDB();
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

app.use('/', indexRouter);
app.use('/questions', questionsRouter);
app.use('/surveys', surveysRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
});



app.listen(port, () => console.log('CORS-enabled web server started on port ' + port));

module.exports = app;
