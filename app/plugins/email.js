
var path           = require('path')
, 	templatesDir   = path.resolve(__dirname, '..', 'server/views/templates/email')
, 	nodemailer     = require('nodemailer');

var email_service = "Gmail";
var email_from = "";
var email_pass = "";

exports.sendemail = function(data,callback) {

	var messageOptions = {
	    from: email_from,
	    to: data.to,
	    subject: data.subject, 
	    html: data.body
	};

	var transport = nodemailer.createTransport({
    service: email_service, 
    auth: {
      user: email_from,
      pass: email_pass
    }
	});

	console.log('Sending Mail');
	transport.sendMail(messageOptions, function(error,info){
    if(error){
        console.log(error.message);
        callback(error.message);
    }
    console.log('Message sent successfully!');
    transport.close(); // close the connection pool
    callback(null,info);
    // if you don't want to use this transport object anymore, uncomment following line
	});  	
}
