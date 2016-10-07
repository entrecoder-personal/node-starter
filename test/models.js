
var config = require('../config/config.json').test
	,	express = require("express")
	, Sequelize = require("sequelize")
	, should = require('should')

	,	app = require('../app.js')
	,	request = require('supertest')(app)

	,	hs = require('../app/plugins/hash.js');

var sequelize = new Sequelize(config.database, config.username, config.password,{
    port: config.port,
    dialect: config.dialect,
    logging: config.logging 
});

var Person = require("../app/server/models/Person.js")(sequelize,Sequelize);
var Profile = require("../app/server/models/Profile.js")(sequelize,Sequelize);  

describe("Model", function(){

  	describe('Person', function() {
	    
	  	before(function(done) {
		 		Person.sync({ force : true }).then(function() {
					done();
				});	
			});

	    it('should insert all field to test data types', function(done) {
	    	var pass_hashed = 'passwordstrength';
	    	hs.saltAndHash(pass_hashed, function(err,hash,salt){
				if(err){
					done(err);
				}
				var newPerson = {
					email: 'john.doe@test.com',
					name_first: 'John',
					name_last: 'Doe',
					password: hash,
					salt: salt,
					password_changed_at: Date.now(),
					reset_password_token: 'ae2b1fca515949e5d54fb22b8ed95575',
					reset_password_expires_at: Date.now(),
					confirmation_token: '39e3f0f901a9fe6dee45c57aa68ef181',
					confirmed_at: Date.now(),
					confirmation_sent_at: Date.now(),
					unconfirmed_email: 'john.doe@test.com',
					role: 'user',
					login_count: 100,
					current_sign_in_at: Date.now(),
					current_sign_in_ip: '1.0.0.1',
					last_sign_in_at: Date.now(),
					last_sign_in_ip: '1.0.0.2',
					failed_attempts: 5
		    }
        Person.create(newPerson)
	        .then(function (p) {
	          p.should.have.property('id');
	          done()
	        }).catch(function (err){
	        	if (err) return done(err);
	        })

			});

		});

		it("should find manditory fields", function(done){    
			
			Person.findOne({where:{email:"john.doe@test.com"}}).then(function(p){      
			  p.email.should.equal("john.doe@test.com");  
			  p.name_first.should.equal("John");    
			  p.name_last.should.equal("Doe"); 
			  p.password.should.not.equal("passwordstrength");
	          p.salt.should.exist;
	          p.status.should.equal("r");
	          p.role.should.equal("user");
			  done();    
			});  
		
		});

		it("should sign in John Doe", function(done){ 

			var newPerson = {
				username: 'john.doe@test.com',
				password: 'passwordstrength'
			}
			request
				.post('/signin')
				.send(newPerson)
				.end(function(err,res){
	        if (err) {
	          throw err;
	        }   
	        done();
			  });
		});

  });

	describe('Profile', function() {

		before(function(done) {
	 		Profile.sync({ force : true }).then(function() {
				done();
			});	
		});

		it("should find manditory fields", function(done){  

			var newProfile = {
				username: 'tester',
		  	name: 'JohnnyD',
		    avatar: '/avatar.png',
		    location: 'Austin',
		    website: 'http://www.test.com',
		    bio: 'Was born in 2015 and beyond',
		    social_facebook: 'facebook.com/test',
		    social_instagram: 'instagram.com/test',
		    social_twitter: 'twitter.com/test',
				pid: 1
      }

      Profile.create(newProfile)
        .then(function (p) {
        	p.should.have.property('id');
        	done()
        }).catch(function (err){
        	if (err) return done(err);
        }) 

		});

		it("should find fields", function(done){ 

			Profile.findOne({where:{pid:1}})
				.then(function(p){      
				  p.username.should.equal("tester");  
				  p.name.should.equal("JohnnyD");    
				  p.avatar.should.equal("/avatar.png"); 
				  p.location.should.equal("Austin");
          p.website.should.equal("http://www.test.com");
          p.bio.should.equal("Was born in 2015 and beyond");
          p.social_facebook.should.equal("facebook.com/test");
          p.social_instagram.should.equal("instagram.com/test");
          p.social_twitter.should.equal("twitter.com/test");
          p.pid.should.equal(1);
				  done();    
				});
				
		});		

	});

});