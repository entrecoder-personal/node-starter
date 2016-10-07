
var express = require('express')
  , http = require('http')
  , https = require('https')
  , session = require('express-session')
  , MongoStore = require('connect-mongo')(session)
  , passport = require('passport')
  , expressValidator = require('express-validator')
  , morgan = require('morgan')  
  , lusca = require('lusca')
  , methodOverride = require('method-override')
  , cookieparser = require('cookie-parser')
  , favicon = require('serve-favicon')
  , bodyparser = require('body-parser')
  , flash = require('connect-flash')
  , fs = require('fs')
  , c = require('nconf')
  , cons = require('consolidate')
  , app = express();

/** make app global variable for less verbose controllers **/

GLOBAL.app = app;
app.enable('trust proxy');

/** check environment variable or set to development **/
var env = process.env.NODE_ENV || 'development';

/** set development specfic settings **/
if ('development' == env) {
  app.use(morgan('dev'));
}

/**	set production specfic settings **/
if ('production' == env) {

}

c.argv().env().file({ file: './config.json' });

var port = c.get(env).port;
var mongo = new MongoStore({ url: c.get(env).mongo.url }); 

app.set('messages', c.get('messages'));
app.set('uhttps', c.get(env).https);
app.set('uhttp', c.get(env).http);
app.set('image_store', c.get(env).image_store);
app.set('file_store', c.get(env).file_store);
app.set('upload_dir', c.get(env).upload_dir);

app.locals.site = c.get('site').title;
app.locals.site_description = c.get('site').description;

app.locals.site_url = app.get('uhttp');
app.locals.site_surl = app.get('uhttps');
app.locals.image_store = app.get('image_store');
app.locals.file_store = app.get('file_store');

/** set session variables **/
var session_options = {
  store: mongo,
  secret: c.get('session').secret,
  cookie: { secure: false, maxAge: new Date(Date.now() + (3 * 3600000))},
  saveUninitialized: true,
  resave: false
};

/** load dust template engine **/
var template_engine = 'dust';
if ( template_engine == 'dust' ) {
  var dust = require('dustjs-linkedin');
  app.engine('dust', cons.dust);
}

// app variables
app.set('port', port);
app.set('views', __dirname + '/app/server/views');
app.set('view engine', template_engine);

/** load models **/
app.set('models', require('./app/server/models'));

app.use(express.static(__dirname + '/app/public') );
app.locals.pretty = true;
app.use(favicon(__dirname + '/app/public/images/favicon.ico'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieparser());
app.use(session(session_options));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

/** passport API authentication **/
var passportConfig = require('./app/plugins/authenticate');

// local variables
app.use(function(req, res, next){
  res.locals.error = req.flash('error');
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  next();
})

/** poad controllers **/
var controllers = require('./app/server/controllers/')(app);

app.use(lusca({
  csrf: true,
  xframe: 'SAMEORIGIN',
  xssProtection: true
}));

var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});

module.exports = app;