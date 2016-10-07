/** information page routes**/

exports.about = function(req, res){
  res.render('info/about',
	{ title : 'About Site'}); 
}

exports.help = function(req, res){
  res.render('info/help',
	{ title : 'Help', page: 'help'})
}

exports.contact = function(req, res){
  res.render('info/contact',
	{ title : 'Contact Us', page: 'contact'})
}

exports.terms = function(req, res){
  res.render('info/terms',
	{ title : 'Terms of Use', page: 'terms'}) 
}

exports.privacy = function(req, res){
  res.render('info/privacy',
	{ title : 'Privacy', page: 'privacy'})
}
