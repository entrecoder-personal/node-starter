var crypto = require('crypto');

/* private encryption & validation methods */
var secret = "needasecret";
var secretID = "secretid";

var sha256 = function(str) {
	return crypto.createHash('sha256').update(str,"utf8").digest('base64');
}

var sha256hex = function(str) {
	return crypto.createHash('sha256').update(str,"utf8").digest('hex');
}

exports.saltAndHash = function(password,callback) {
	crypto.randomBytes(120, function(err, buf) {
        var salt = buf.toString('hex');
        crypto.pbkdf2(password, salt, 4000, 128, function(err, encodedPassword) {
            if (err) callback(err);
            var encoded = new Buffer(encodedPassword).toString('base64');
            callback(null,encoded,salt);
        }.bind(this));
    });
}

exports.saltHash = function(password) {
  var salt = crypto.randomBytes(16).toString('hex');
  var encodedPassword = crypto.pbkdf2Sync(password, salt, 4000, 32);
  var encoded = new Buffer(encodedPassword).toString('hex');
  if(!encodedPassword) return false;
  return salt+encoded; 
}

exports.validateSaltHash = function(attempt, passwordHash, callback){
    var salt = passwordHash.substring(0,16);
    var encodedPassword = crypto.pbkdf2(attempt, salt, 4000, 32);
    if (!encodedPassword) return false;
    return ( new Buffer(encodedPassword).toString('hex') === passwordHash.substring(16) )
}

exports.cipherID = function(text){
  var cipher = crypto.createCipher('aes-256-cbc',secretID)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

exports.decipherID = function(text){
  var decipher = crypto.createDecipher('aes-256-cbc',secretID)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

exports.generateActivationCode = function(user)
{
	return sha256hex(secret+user);
}

exports.validateActivationCode = function(code, user)
{
	var validHash = sha256hex(secret+user);
	return (code === validHash);
}

exports.validatePassword = function(attempt, passwordHash, salt, callback){
  crypto.pbkdf2(attempt, salt, 4000, 128, function(err, derivedKey){
    if (err) return callback(err);
    callback(
        null, 
        (new Buffer(derivedKey).toString('base64') === passwordHash)
    );
  });
}
