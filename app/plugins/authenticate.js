/**
 * User Login , logout functions
 */

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var hs = require('./hash')
  , Person = app.get('models').Person;

passport.use(new LocalStrategy(
  function(username, password, done) {
    if (typeof(username) == 'undefined' || typeof(password) == 'undefined') {
        return done(null, false, { message: app.get("messages").signin.error.username } ); 
    } else {
      var data = { email: username.toLowerCase(), status:'a'};
      Person.findOne({where:data})
        .then(function(p) {
          if(!p){
            return done(null, false, { username: username, message: app.get("messages").signin.error.email }); 
          }
          hs.validatePassword(password, p.password, p.salt, function(err,user){
            if (err) { 
              return done(null, false, { username: username, message: app.get("messages").signin.error.email } );
            } else {
              if (!user) { 
                return done(null, false, { username: username, message: app.get("messages").signin.error.email, attempt: true } ); 
              } else {
                return done(null, p);
              }
            }
          })
        })
        .catch(function(error) {
          return done(null, false, { username: username, message: app.get("messages").signin.error.email }); 
        }); 
    }
  }
));

passport.serializeUser(function(person, done) {
  done(null, person.id);
});

passport.deserializeUser(function(id, done) {
  Person.findOne({ where: {id: id}}).then(function(p){
    done(null,p);
  }).catch(function(e){
    done(e);
  })
});