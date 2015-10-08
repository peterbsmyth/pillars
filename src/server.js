var express          = require('express');
var app              = express();
var mysql            = require('mysql');
var session          = require('express-session');
var config           = require('./server/config.js');
var passport        = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

// --------- connect to db
var pool = mysql.createPool(config.db);

// --------- set up passport for auth
app.use(session({secret: 'the eiffel hour'}));
app.use(passport.initialize());
app.use(passport.session());


// -------- test

passport.use(new FacebookStrategy({
    clientID: 632957986806652,
    clientSecret: '517ac3cc50241c7dbe50d11ce7da9b9a',
    callbackURL: "http://45.55.220.196/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null,profile);
  }
));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));


// --------- serve static pages
// use '/' instead of '/client/views' for all html file lookups
app.use('/',express.static(__dirname + "/client/views"));

// use '/js' instead of '/client/js' for all js file lookups
app.use('/js', express.static(__dirname + '/client/js'));

// use '/css' instead of '/client/css' for all js file lookups
app.use('/css',express.static(__dirname + "/client/css"));

// --------- establish api router
var router  = express.Router();
app.use('/api',router);
require('./server/routes.js')(router);


// --------- listen for requests on port 3000
app.listen(3000,function(){
  console.log("Running on port 3000");
});
