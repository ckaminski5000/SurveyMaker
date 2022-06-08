var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv').config();
const { connectDB } = require('./backend/config/db');
const cors = require('cors')
const { auth } = require('express-openid-connect');
var { expressjwt: jwt } = require('express-jwt');
console.log(jwt);
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-v-oprh9i.us.auth0.com/.well-known/jwks.json'
}),
audience: 'http://localhost:5000',
issuer: 'https://dev-v-oprh9i.us.auth0.com/',
algorithms: ['RS256']
});




const port = process.env.PORT || 3000;

var indexRouter = require('./backend/routes/index');
var questionsRouter = require('./backend/routes/questions');
var surveysRouter = require('./backend/routes/surveys');
var usersRouter = require('./backend/routes/users');


connectDB();
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(jwtCheck);

app.use('/', indexRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/surveys', surveysRouter);
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

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
  });

app.listen(port, () => console.log('CORS-enabled web server started on port ' + port));

module.exports = {app, jwtCheck};
