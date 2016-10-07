
var roles = ['admin','pro','user'];
var path = require('path');

module.exports = {
  role: function(req, res, next) {
    if(req.session && req.session.cookie.originalMaxAge < 0){
      req.session.cookie.maxAge = new Date(Date.now() + ( 3 * 3600000 ));
    } 
    if (req.user) {
      if(roles.indexOf(req.user.role) != -1){
        res.locals.auth = true; 
        res.locals.user = req.user;
      } else {
        res.locals.auth = false; 
      }
    } else {
      res.locals.auth = false; 
    }
    next();
  },
  user: function(req, res, next) {
    if (!req.user) {
      res.redirect('http://' + req.header('Host') + "/");
    } else {
      next();
    }
  },
  asset: function(req, res, next) {
    if (!(/^\/[0-9]\/.*$/).test(req.url)) { 
      return res.redirect('/404');
    }
    if(req.user && (req.user.id == req.url.split("/")[1])) {
      res.sendFile(path.resolve( app.get('upload_dir') + req.url ));
    } else {
      res.status(403).send('Sorry! you cant see that.');    
    }
  },
  ajax: function(req, res, next) {
    if (!req.user) {
      res.status(401).send('unauthorized');  
    } else {
      next();
    }
  },
  restrict_to_self: function(req, res, next) {
    if (req.session && (req.session.authuser == req.user.id)) {
      next();
    } else {
      res.redirect('https://' + req.header('Host') + "/");
    }
  },
  restrict_to: function(role) {
    return function(req, res, next) {
      if (req.user.role == role) {
        next();
      } else {
        res.render('unauthorized',{ title : 'No access'});
      }
    }
  }
}