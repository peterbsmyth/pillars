var express          = require('express');
var app              = express();
var mysql            = require('mysql');
var session          = require('express-session');
var db               = require('./server/config/db.js');
var passport         = require('passport');
var mongoose         = require('mongoose');
var morgan           = require('morgan');
var bodyParser       = require('body-parser');
var ejs              = require('ejs');

app.use(morgan('dev'));
app.use(bodyParser());

// --------- connect to dbs
var pool = mysql.createPool(db.sql);
mongoose.connect(db.mongoose.url);

// passport
require('./server/config/passport')(passport);
app.use(session({ secret: "thisIsSuperDuperUBERsecret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// --------- serve static pages
// use '/js' instead of '/client/js' for all js file lookups
app.use(express.static(__dirname + '/client/'));


// --------- set base view
app.set('views', './src/server/views');
app.set('view engine', 'ejs'); // set up ejs for templating
// app.get('/',function(req,res){
//   res.render('signup.ejs');
// });

// --------- establish api router
var apiRouter  = express.Router();
app.use('/api',apiRouter);
require('./server/apiRoutes.js')(apiRouter);

// --------- establish auth router
// var authRouter  = express.Router();
// app.use('/auth',authRouter);
require('./server/authRoutes.js')(app,passport);


// --------- listen for requests on port 3000
app.listen(3000,function(){
  console.log("Running on port 3000");
});
