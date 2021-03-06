// Load any config vars from .env file
require('dotenv').config({ silent: true });
var request = require('request');

exports.handler = function(event, context) {

	// RETURN for context.succeed must exist. Variable should be used for
	// error handling. RETURN will be master data object.
	var RETURN = "Interaction success.";

	interactionName = event.value;
	configKeys = event.keys;

	interactionName = slugify(interactionName);

	request.get('https://lambda.herokuapp.com/api/v1/i/' + interactionName, {auth: {
		'user': configKeys.user,
		'pass': configKeys.pass
		}},
		function(error, response, body){
			body = JSON.parse(body);
			if(error){
				RETURN = error;
			}	
			if(response.statusCode != 200){
				RETURN = "Error code: " + response.statusCode + ". Please contact system admin or interaction developer for help.";
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

		  //context.succeed must be returned to exports.handler last after your interaction code run. 
		  //Beware asynchronous server calls.
		  context.succeed(RETURN);
	});
}

/**
	 * URL friendly string
	 *
	 * @param {String} str
	 */
	function slugify(str) {
	  return str.toString().toLowerCase()
	    .replace(/\s+/g, '-')        // Replace spaces with -
	    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
	    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
	    .replace(/^-+/, '')          // Trim - from start of text
	    .replace(/-+$/, '');         // Trim - from end of text
	}