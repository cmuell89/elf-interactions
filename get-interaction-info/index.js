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

	return request.get('https://lambda.herokuapp.com/api/v1/i/' + interactionName, {auth: {
		'user': configKeys.email,
		'pass': configKeys.elf_api_key
		}},
		function(error, response, body){
			body = JSON.parse(body);
			if(error){
				RETURN = error;
			}	
			if(response.statusCode != 200){
				RETURN = "Error code: " + response.statusCode + ". Please contact system admin or interaction developer for help.";

			} else {
				RETURN = 	'Interaction name: ' + body.data.name_display + '\r\n' +
							'Domain: ' + body.data.domain + '\r\n' +
							'Description: ' + body.data.output_description + '\r\n' +
							'Repository URL: ' + body.data.repo_url + '\r\n' +
							'Keys: ' + body.data.keys + '\r\n' +
							'User: ' + body.data.user + '\r\n' +
							'Collaborators: ' + body.data.collaborators + '\r\n' +
							'Upvotes: ' + body.data.upvotes + '\r\n' +
							'Code: ' + body.data.code + '\r\n' ;
			}

		  //context.succeed must be returned to exports.handler last after your interaction code run. 
		  //Beware asynchronous server calls.
		  return context.succeed(RETURN);
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

