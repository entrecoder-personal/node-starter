var pg = require('pg');
var config = require('./config.json');

var conString = "postgres://"+ config.development.username +":"+ config.development.password +"@localhost";

pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('CREATE DATABASE IF NOT EXISTS database_development', function(err, result) {
    done();

    if(err) {
      return console.error('error running query', err);
    }
    console.log('Development Database created: ',result.rows[0].number);

  });
  client.query('CREATE DATABASE IF NOT EXISTS database_test', function(err, result) {
    done();

    if(err) {
      return console.error('error running query', err);
    }
    console.log('Test Database created: ',result.rows[0].number);

  });
});