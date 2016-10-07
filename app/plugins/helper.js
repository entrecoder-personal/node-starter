//* Function helpers *//

exports.forceSSL = function(req, res, next){
	if(!req.secure){
    	res.redirect('https://' + req.header('Host') + req.url);
  	} else {
	    next();
  	}
}

exports.forceNoSSL = function (req, res, next){
	if(req.secure){
		res.redirect('http://' + req.header('Host') + req.url);
	} else {
		next();
	}
}

exports.slugify = function(str) {
  var from  = "ąàáäâãåæćęèéëêìíïîłńòóöôõøśùúüûñçżź",
      to    = "aaaaaaaaceeeeeiiiilnoooooosuuuunczz",
      regex = new RegExp('[' + from.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1') + ']', 'g');
 
  if (str == null) return '';
  str = String(str).toLowerCase().replace(regex, function(c) {
    return to.charAt(from.indexOf(c)) || '-';
  });
 
  return str.replace(/[^\w\s-]/g, '').replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
}
