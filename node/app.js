//Express module
var express = require('express');
//Path module: contains several helper functions to help make path manipulation easier.
var path = require('path');
//Favicon module: 
var favicon = require('serve-favicon');
//Logger module.
var logger = require('morgan');
//Cookie module: cookie-parser parses Cookie header and populate req.cookies with an object keyed by the cookie names.
var cookieParser = require('cookie-parser');
//Body parser module: The bodyParser object exposes various factories to create middlewares. All middlewares will populate the req.body property with the parsed body, or an empty object ({}) if there was no body to parse (or an error was returned).
var bodyParser = require('body-parser');

//var users = require('./routes/users');
//var hike = require('./routes/hike');
//var routes = require('./routes/index');
var zonas = require('./routes/zonas');
var usuarios = require('./routes/usuarios');

//Database connection
var db = require('./db')

//Create an express application
var app = express();
//Development variable
app.set('env', 'development');

//JSON
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//

////////////////////////////////////////////////////////////////////////////////////////////////
//Session
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var sessionData = require('./session');
var sessionStore = new MySQLStore(sessionData.options);

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret2',
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {
      expires: false
    },
}));

/*
app.use(function (req, res, next) {
  var userName = req.session.userName

  if (!userName)
    console.log("No user session");
  else
    console.log("user session: " + userName);
  next()
});
*/

/////////////////////////////////////////////////////////////////////////////////

//app.get('/hikes', hike.index);
//app.post('/add_hike', hike.add_hike);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
//Logger supported formats: default, short ,tiny, and dev
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Static path
app.use(express.static(__dirname + '/public'));
//app.use('/', routes);

app.get('/zonas', zonas.all)
app.get('/usuarios/activeSession', function(req,res){
  var userName = req.session.userName;
  var response;

  if (!userName)
    response = {status:'ERROR'};
  else{
    response = {status:'SUCCESS'};
    response.data = {user: userName , email: req.session.userName};
  }
  res.send(JSON.stringify(response));
})
app.get('/usuarios/logout', function(req,res){
  req.session.destroy();
  var response;

  if (req.session)
    response = {status:'ERROR'};
  else{
    response = {status:'SUCCESS'};
  }
  res.send(JSON.stringify(response));
})

app.post('/usuarios', function(req,res){
  usuarios.register(req,res)
  console.log(":::::"+res);
  if (res.status = "SUCCESS"){
    req.session.userName = req.body.nombre;
    req.session.email = req.body.email;
  }
})

// Connect to MySQL on start
db.connect(db.MODE_PRODUCTION, function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  } 
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ERROR handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
