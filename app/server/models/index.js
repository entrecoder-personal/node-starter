var fs        = require("fs")
,   path      = require("path")
,   Sequelize = require('sequelize')
,   db        = {}
,   dbconfig;

var c = require('nconf');
c.file({ file: './config/config.json' });

var env = process.env.NODE_ENV || 'development';

/* Load Sequelize */

if ('production' == env) {

  dbconfig  = c.get('production');
  var sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password,{
    port: dbconfig.port,
    dialect: dbconfig.dialect,
    protocol: dbconfig.protocol
  });

} else if('development' == env) {

  dbconfig = c.get('development');
  var sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password,{
    port: dbconfig.port,
  	dialect: dbconfig.dialect,
  	protocol: dbconfig.protocol
  });

}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;