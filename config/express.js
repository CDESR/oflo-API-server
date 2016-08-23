// INITIALIZER FOR MY EXPRESS APPLICATION

// declaring constants, don't change
var jwt_secret = 'somesuperlongwordthatnoonewillknownwhateverwheneverwherever';

// requiring installed modules

var config = require('./config'),
  express = require('express'),
  morgan = require('morgan'),
  compress = require('compression'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  expressLayouts = require('express-ejs-layouts'),
  expressJWT = require('express-jwt'),
  jwt = require('jsonwebtoken');

module.exports = function() {
  var app = express();

  // initialize the required middleware
  if (! process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT");
    next();
  });

  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(bodyParser.json());
  app.use(methodOverride());


// express-jwt

  // app.use( expressJWT({
  //   secret: jwt_secret})
  //   .unless({
  //     path: [ '/users/signup',
  //             '/users/login',
  //             {url: '/questions',
  //             method: ['GET']},
  //             {url: '/commonquestions',
  //             method: ['GET']},
  //           ]
  //         }
  //       )
  //     );


  require('../app/routes/users.routes')(app);
  require('../app/routes/questions.routes')(app);
  require('../app/routes/commonquestions.routes')(app);


  // app.use(express.static('./public'));

  return app;
};
