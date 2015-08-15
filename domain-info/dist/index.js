// Load any config vars from .env file
require('dotenv').config({ silent: true });

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
			if(error){
				RETURN = error;
			}	
			if(response.statusCode != 200){
				RETURN = "Error code: " + response.statusCode
			}
				RETURN = 	'Domain name: ' + body.name_display + '\r\n' +
							'Description: ' + body.description + '\r\n' +
							'Interactions: ' + body.interactions  + '\r\n' +
							'Keys: ' + body.keys + '\r\n' +
							'User: ' + body.user + '\r\n' +
							'Pending Interactions: ' + body.pending_interactions + '\r\n'
			}
		});

  //connect.succeed must be returned to exports.handler last after your interaction code run
  context.succeed(RETURN);
});


