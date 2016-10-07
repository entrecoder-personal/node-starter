/** home page routes **/

var c = require('nconf')
	,	async = require('async');

exports.index = function(req, res, next){
 	if (req.user) return res.redirect('/home');
	res.render('index',{
 		title : 'Welcome to Prototype'
 	})
}

exports.home = function(req, res, next){
	async.parallel({
    home_items: function(callback){
			callback(null);
    }
	},    
 	function(err) {
 		res.render('home', { 
			title : 'Home | Prototype', 
			user: req.user
		})
 	})
}

