"use strict";

module.exports = function(sequelize, Sequelize) {
  var Person = sequelize.define('Person', {
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    name_first: { type: Sequelize.STRING, allowNull: false },
    name_last: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    salt: { type: Sequelize.STRING, allowNull: false },
    password_changed_at: { type: Sequelize.DATE, allowNull: true },
    reset_password_token: { type: Sequelize.STRING, allowNull: true, defaultValue: null },
    reset_password_expires_at: { type: Sequelize.DATE, allowNull: true },
    remember_created_at: { type: Sequelize.DATE, allowNull: true },
    confirmation_token: { type: Sequelize.STRING, allowNull: true, defaultValue: null },
   	confirmed_at: { type: Sequelize.DATE, allowNull: true },
    confirmation_sent_at: { type: Sequelize.DATE, allowNull: true },
    unconfirmed_email: { type: Sequelize.STRING, allowNull: true, defaultValue: null },
    status: { type: Sequelize.ENUM, values: ['r','a','s','d'], allowNull: false, defaultValue: 'r' },
    role: { type: Sequelize.ENUM, values: ['admin','user'], allowNull: false, defaultValue: 'user' },
		login_count: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 },
    current_sign_in_at: { type: Sequelize.DATE, allowNull: true },
   	current_sign_in_ip: { type: Sequelize.STRING, allowNull: true },
   	last_sign_in_at: { type: Sequelize.DATE, allowNull: true },
    last_sign_in_ip: { type: Sequelize.STRING, allowNull: true },
    failed_attempts: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 }, 
    locked_at: { type: Sequelize.DATE, allowNull: true }
  }, {
    underscored: true,
    paranoid: true,
  	freezeTableName: true,
    instanceMethods: {},
    classMethods: {
    	associate: function(models) {
	    	Person.hasOne(models.Profile, { foreignKey: 'pid'});
	    },
			createOne: function(data,callback){ 
				Person.create({
					email: data.email.toLowerCase(),
					name_first: data.name_first,
					name_last: data.name_last,
					password: data.password,
					salt: data.salt,
					status: data.status,
					role: data.role
				})
				.then(function(newPerson) {
			  		callback(null,newPerson);
			  	})
			  	.catch(function(error) {
			    	callback(error);
	  			});
			},
			updateOne: function(id,data,callback){ 
				Person.findById(id).then(function (p) { 
						p.updateAttributes(data)
					.then(function(up) {
						callback(null,up);
					})
					.catch(function(error) {
				    	callback(error);
		  			});
				});
			},
			removeOne: function(id,data,callback){ 
				Person.findById(id).then(function (p) {
					p.destroy()
					.then(function(pd) {
						callback(null,pd);
					})
					.catch(function(error) {
						callback(error);
					});
				});	
			},
			resetToken: function(token,callback){ 
				Person.find({ where: {reset_password_token: token, status: 'a'} })
					.then(function(p) {
						callback(null,p);
					})
					.catch(function(error) {
						callback(error);
					});
			},
			activateToken: function(token,callback){ 
				Person.findOne({ where: {confirmation_token: token, status: 'r'} })
					.then(function(p) {
						callback(null,p);
					})
					.catch(function(error) {
						callback(error);
					}); 	
			},
			incrementLogin: function(email,data,callback){ 
				Person.findOne({where: email})
					.then(function(p) {
					  	p.increment('login_count').then(function(pi){
					  		 pi.updateAttributes(data)
								.then(function(pr) {
									callback(null,pr);
								})
					  	})
					})
			},
			incrementFailedLogin: function(data,callback){ 
				Person.findOne({where: data})
					.then(function(p) {
					  	p.increment('failed_attempts').then(function(pi){
							callback(null,pi);
					  	})
					}).catch(function(error) {
						callback(error);
					}); 
			},
			countPeople: function(callback){ 
				Person.count({ where: { status: 'a' }})
					.then(function(uc) {
						callback(uc);
					})
			}	
  	},
  });
  return Person;
};