/** route index declarations **/

var multer = require('multer')({ dest: 'tmp/' })
,	home = require('./home')
,	info = require('./info')
,	account = require('./account')
,	errors = require('./error')
,	authorize = require('../../plugins/authorize')
,	h = require('../../plugins/helper')
,	api = require('./api');

// routes

module.exports = function(app) {
	
	/* all routes */
	app.all('*', authorize.role);

	/* home page routes */
	app.get('/', home.index);
	app.get('/home', authorize.user, home.home);
	app.get('/people',authorize.asset);
	
	/* account routes */
	app.get('/account', authorize.user, account.index);
	
	app.post('/account/profile', multer.single('avatar'), account.profilePost);
	app.get('/account/profile', account.profile);

	app.post('/account/password', account.passwordPost);
	app.get('/account/password', authorize.user, account.password);

	/* authentication routes */
	app.post('/signup', api.signupPost);
	app.get('/signup', api.signup);

	app.post('/signin', api.signinPost);
	app.get('/signin', api.signin);

	app.get('/signout',  authorize.user, api.signout);

	app.post('/forgot', api.forgotPost);
	app.get('/forgot', api.forgot);

	app.post('/retrieve', api.retrievePost);
	app.get('/retrieve', api.retrieve);

	app.get('/activation/:id', api.activate);

	/* information routes */
	app.get('/about', info.about);
	app.get('/help', info.help);
	app.get('/terms', info.terms);
	app.get('/privacy', info.privacy);
	app.get('/contact', info.contact);

	app.get('/success', api.success);

	/* error routes */
	app.use(errors.error404);
	app.use(errors.error500);
}