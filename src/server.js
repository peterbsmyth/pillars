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
var Sequelize        = require('sequelize');

app.use(morgan('dev'));
app.use(bodyParser());

// --------- connect to dbs
var pool = mysql.createPool(db.sql);
var sequelize = new Sequelize(db.sqlize.db, db.sqlize.u, db.sqlize.p, db.sqlize.o);
mongoose.connect(db.mongoose.url);

// passport
require('./server/config/passport')(passport);
app.use(session({ secret: "thisIsSuperDuperUBERsecret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// --------- enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// --------- serve static pages
// use '/js' instead of '/client/js' for all js file lookups
app.use(express.static(__dirname + '/client/'));


// --------- set base view
console.log(
  __dirname
)
app.set('views', __dirname + '/server/views');
app.set('view engine', 'ejs'); // set up ejs for templating
// app.get('/',function(req,res){
//   res.render('signup.ejs');
// });

// --------- establish api router
var apiRouter  = express.Router();
app.use('/api',apiRouter);
require('./server/apiRoutes.js')(sequelize,pool,apiRouter,passport);

// --------- establish auth router
// var authRouter  = express.Router();
// app.use('/auth',authRouter);
require('./server/authRoutes.js')(app,passport);


// --------- listen for requests on port 3000
app.listen(3010,function(){
  console.log("Running on port 3010");
});
