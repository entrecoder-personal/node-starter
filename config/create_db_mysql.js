var mysql  = require('mysql');
var config = require('./config.json');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : config.development.username,
  password : config.development.password
});

connection.connect();

connection.query('CREATE DATABASE IF NOT EXISTS database_development', function(err, rows, fields) {
  if (err) throw err;

  console.log('Develoipment Database created: ', rows);
});

connection.query('CREATE DATABASE IF NOT EXISTS database_test', function(err, rows, fields) {
  if (err) throw err;

  console.log('Test Database created: ', rows);
});

connection.end();
