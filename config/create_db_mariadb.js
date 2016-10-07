var Client = require('mariasql');
var config = require('./config.json');

var c = new Client({
  host: '127.0.0.1',
  user: config.development.username,
  password: config.development.password
});

c.query('CREATE DATABASE IF NOT EXISTS database_development', function(err, rows) {
  if (err)
    throw err;
  console.log('Development Database created: ',rows);
});

c.query('CREATE DATABASE IF NOT EXISTS database_test', function(err, rows) {
  if (err)
    throw err;
  console.log('Test Database created: ',rows);
});

c.end();