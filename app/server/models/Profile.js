"use strict";

module.exports = function(sequelize, Sequelize) {
  var Profile = sequelize.define('Profile', {
  	username: { type: Sequelize.STRING, allowNull: true, unique: true },
  	name: { type: Sequelize.STRING, allowNull: true },
    avatar: { type: Sequelize.STRING, allowNull: true },
    location: { type: Sequelize.STRING, allowNull: true },
    website: { type: Sequelize.STRING, allowNull: true },
    bio: { type: Sequelize.STRING, allowNull: true },
    pid: { type: Sequelize.INTEGER, allowNull: false, unique: true, references: { model:"Person", key: "id" }},
    social_facebook: { type: Sequelize.STRING, allowNull: true },
    social_instagram: { type: Sequelize.STRING, allowNull: true },
    social_twitter: { type: Sequelize.STRING, allowNull: true } 
  }, {
    underscored: true,
    paranoid: true,
  	freezeTableName: true,
    instanceMethods: {},
    classMethods: {
    	associate: function(models) {
	    	Profile.belongsTo(models.Person, { foreignKey: 'pid'});
	    },
			createOne: function(pid,callback){ 
				Profile.create({
					pid: pid
				})
				.then(function(newPerson) {
			  		callback(null,newPerson);
			  	})
			  	.catch(function(error) {
			    	callback(error);
	  			});
			},
			updateOne: function(id,data,callback){ 
				Profile.findOne({where:{pid:id}})
					.then(function (p) { 
						p.updateAttributes(data)
							.then(function(up) {
								callback(null,up);
							})
							.catch(function(error) {
						    	callback(error);
				  			});
					}).catch(function(error) {
				    	callback(error);
		  			});
			}
  	},
  });
  return Profile;
};