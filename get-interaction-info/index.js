// Load any config vars from .env file
//require('dotenv').config({ silent: true });
var request = require('request');

exports.handler = function(event, context) {

	// RETURN for context.succeed must exist. Variable should be used for
	// error handling. RETURN will be master data object.
	var RETURN = "Interaction success.";

	interactionName = event.value;
	configKeys = event.keys;

	request.get('https://lambda.herokuapp.com/api/v1/d/' + interactionName, {auth: {
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
				RETURN = "Error code: " + response.statusCode + ". Please contact system admin or interaction developer for help."
			} else {
				RETURN = 	'Interaction name: ' + body.data.name_display +
							'Domain: ' + body.data.domain
							'Description: ' + body.data.output_description +
							'Repository URL: ' + body.data.repo_url +
							'Keys: ' + body.data.keys +
							'User: ' + body.data.user +
							'Collaborators: ' + body.data.collaborators +
							'Upvotes: ' + body.data.upvotes +
							'Code: ' + body.data.code;
			}

		  //connect.succeed must be returned to exports.handler last after your interaction code run. 
		  //Beware asynchronous server calls.
		  context.succeed(RETURN);
	});
}


