const express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var db = require('./utils/db');
var User = require('./models/user')
var router = express.Router();
var https = require('https');
var fs = require('fs');
const fileUpload = require('express-fileupload');


const app = express();
app.use(fileUpload());


const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname));

// Allow CORS so that backend and frontend could be put on different servers on the same host
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,

}
app.use(cors(corsOptions));

// Parse body and put parsed result in req.body
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(bodyParser.json());



// Express Session
app.use( session( { secret: 'keyboard cat',
                    cookie: {
                      httpOnly: true,
                      maxAge: 60*60*1000
                    },
                    store: new MongoStore({ mongooseConnection: db }),
                    rolling: true,
                    resave: true,
                    saveUninitialized: false
                  }
         )
);


// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Register all our routes in routes/index.js
require('./routes')(app, router);

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }
      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
     	if(isMatch){
     	  return done(null, user);
     	} else {
     	  return done(null, false, {message: 'Invalid password'});
     	}
     });
   });
  }
));

passport.serializeUser(function(user, done) {
  console.log('serializeUser');
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserializeUser');
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// Test root endpoint
app.get('/', (req, res) => {
    res.json({"page":"root"});
})

/*
// Endpoint to login
app.post('/api/login', passport.authenticate('local'), function(req, res) {
    console.log("someone tries to login....");
    console.log(req.user);
    req.login(req.user, function(err) {
      if (err) { return next(err); }
      return res.status(200).send(req.user);
    });
  }
);



// Endpoint to logout
app.get('/api/logout', function(req, res){
  req.logout();
  res.send(null)
});
*/
/*
Example end point, before returning data,check if logged in
app.get('/api/transfermoney',function(req, res){
  console.log(req.session);
  res.json({"is_authenticated" : req.isAuthenticated()});
})
*/
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
