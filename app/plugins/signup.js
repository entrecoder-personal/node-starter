var hs = require('./hash') 	
,		em = require('./email')
,   async = require('async')
,   _ = require('lodash')
,		Person = app.get('models').Person;

module.exports = {
  createPerson: function(data,callback) {
		async.waterfall([
			function(callback){
				Person.findOne({ where: {email: data.email} })
					.then(function(p) {
					    if (p) {
					      callback('Account with that email address already exists');
					    } else {
					      callback(null);
					    }
					}).catch(function(e){
						callback(e);
					})
			},
	    function(callback){
	    	//hash passwords and create data record
	    	hs.saltAndHash(data.password, function(err,hash,salt){
					if(err){
						callback(err);
					}
					data.password = hash;
					data.salt = salt;
					data.status = 'r';
		  		data.role = 'user';
					callback(null,data);
				});
	    },
	    function(data,callback){
	    	//create user and store in db
        	Person.createOne(data, function(e,p){
						if(e){
							callback(app.get('messages').signup.error.signup);
						} else {
							if(!p){
								callback(app.get('messages').signup.error.signup);
							} else {
								var akey = hs.generateActivationCode(p.email);
								callback(null,akey,p);
							}
						}
					})
	    },
	    function(akey,p,callback){
	    	//update database with user activation key
		    Person.updateOne(p.id, { confirmation_token: akey, unconfirmed_email: p.email }, function(e,p){
					if(e){
						callback(app.get('messages').signup.error.system);
					} else {
						if(!p){
							callback(app.get('messages').signup.error.system);
						} else {
							var link = app.get('uhttp')+"activation/"+akey;
								
							var body = "Welcome to "+app.locals.site+", Activate with link below: <br/><br/>";
							body += link;
							body += "<br><br> "+app.locals.site+" Team";
	    	
							var email = { 
								subject: app.get("messages").signup.email_subject,
								to: p.email,
								body: body
							}
							callback(null,email,p);
						}
					}
				})
	    },
	    function(email,p,callback){
	      em.sendemail(email, function(e,r){
					if(e){ 
						callback(app.get('messages').error.system);
					}
					if(!r){
						callback(app.get('messages').error.system);
					} else {
						Person.updateOne(p.id, { confirmation_sent_at: new Date() }, function(e,p){
							if(e){
								callback(e);
							} else {
								callback(null,p);
							}
						})
					}						
				})
	    }
		],
		function(err, p) {
		   if(err) callback(err);
		   callback(null,p);
		});
	}
}