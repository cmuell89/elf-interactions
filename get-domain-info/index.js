// Load any config vars from .env file
require('dotenv').config({ silent: true });
var request = require('request');

exports.handler = function(event, context) {

	// RETURN for context.succeed must exist. Variable should be used for
	// error handling. RETURN will be master data object.
	var RETURN = "Interaction success.";

	domainName = event.value;
	configKeys = event.keys;

	request.get('https://lambda.herokuapp.com/api/v1/d/' + domainName, {auth: {
		'user': configKeys.user,
		'pass': configKeys.pass,
		'sendImmediately' : true
		}},
		function(error, response, body){
			body = JSON.parse(body);
			if(error){
				RETURN = error;
			}	
			if(response.statusCode != 200){
				RETURN = "Error code: " + response.statusCode
			} else {
				RETURN = 	'Domain name: ' + body.data.name_display +
							' Description: ' + body.data.description +
							' Interactions: ' + body.data.interactions +
							' Keys: ' + body.data.keys +
							' User: ' + body.data.user +
							' Pending Interactions: ' + body.data.pending_interactions;
			}

		  //connect.succeed must be returned to exports.handler last after your interaction code run
		  context.succeed(RETURN);
	});
	
	context.succeed(RETURN);
}


