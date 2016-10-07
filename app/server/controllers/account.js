/** account management routes **/

var _ = require('lodash')
	,	async = require('async')
	, fs = require('fs')
	, mime = require('mime')
	,	hs = require('../../plugins/hash')
	,	Person = app.get('models').Person
	,	Profile = app.get('models').Profile;

exports.index = function(req, res, next){
	res.render('account/index', {
		title : 'Account'
	})
}

exports.profilePost = function(req, res, next){	
	async.waterfall([
  	function(callback) {
  		if(typeof req.file !== 'undefined'){
    		var pid = req.user.id;
    		var dir = app.get('upload_dir')+pid;
				if (!fs.existsSync(dir)) fs.mkdirSync(dir);
			 	var filename = req.file.filename+"."+mime.extension(req.file.mimetype);
				fs.readFile( "./"+req.file.path, function (err, data) {
				  var newPath = app.get("upload_dir") + pid +"/"+ filename;
				  fs.writeFile(newPath, data, function (err) {
					 	fs.unlink("./"+req.file.path, function(err) {
				      if (err) callback(err);  
					        callback(null,filename);
					  });
				  });
				});
			} else {
				callback(null,null);
			}
  	},
  	function(filename,callback) {
  		var data = {};
  		if(filename){
				data.avatar = filename;
			}
			data.username = req.body.username;
			data.name = req.body.name;
			data.location = req.body.location;
			data.website = req.body.website;
			data.bio = req.body.bio;
			data.social_facebook = req.body.facebook;
			data.social_twitter = req.body.twitter;
			data.social_instagram = req.body.instagram;

			Profile.updateOne(req.user.id,data,function(err,p){
				if(err){
					console.log(err);
					callback(app.get("messages").error.system);
				} else {
					if(!p) callabck(app.get("messages").profile.error.general);
					callback(null);
				}
			})
  	}
	], function(err) {
		if(err){
			req.flash('error', err);
			return res.redirect('/account/profile');
		}
		req.flash('success', app.get("messages").profile.success.done);	
		return res.redirect('/account/profile');
	});
}

exports.profile = function(req, res, next){
	Profile.findOne({where: { pid: req.user.id }})
		.then(function(p){
			if(!p){
				req.flash('error', 'Your profile is empty');
				return res.redirect('/account/profile');
			}
			res.render('account/profile',{
				title: 'Profile', profile: p
			})
		})
		.catch(function(e){
			req.flash('error', app.get("messages").error.system);
			res.redirect('/account/profile');
		})
}

exports.passwordPost = function(req, res, next){	
	var	pw_old = req.body.password_old
	,		pw_new = req.body.password_repeat;

	Person.findById(req.user.id)
		.then(function(p) {
			hs.validatePassword(pw_old, p.password, p.salt, function(err,user){
				if(!user){
					req.flash('error', app.get("messages").forgot.error.password);
					res.redirect('/account/password');
				} else {
				hs.saltAndHash(pw_new, function(err, hash, salt){
				if(err) {
					req.flash('error', app.get("messages").error.system);
					return res.redirect('/account/password');
				} 
				var data = { password: hash, salt: salt, password_changed_at: Date.now() };
				Person.updateOne(p.id, data, function(e,s){
					if(!s){
						req.flash('error', app.get("messages").error.system);
						res.redirect('/account/password');
					} else {
						req.flash('success', app.get("messages").forgot.success.password_updated);	
						res.redirect('/account/password');
					}
				})	
			})
		  }
    })
	})
	.catch(function(e){
    req.flash('error', app.get("messages").error.system);
    res.redirect('/account/password');	
	})
}

exports.password = function(req, res, next){
	res.render('account/password',{
		title : 'Change Password'
	})
}
