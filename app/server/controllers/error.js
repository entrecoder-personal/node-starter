/** error page routes**/

exports.error404 = function(req, res, next){
  res.status(400);
  res.render('error404', { title: 'Page Not Found...'}); 
}

exports.error500 = function(err, req, res, next){
  res.status(500);
  res.render('error500', { title: 'Oops we found an error...', err: err }); 
}
