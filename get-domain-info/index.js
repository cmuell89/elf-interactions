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
		'user': configKeys.email,
		'pass': configKeys.elf_api_key,
		'sendImmediately' : true
		}},
		function(error, response, body){
			body = JSON.parse(body);
			if(error){
				RETURN = error;
			}	
			if(response.statusCode != 200){
				RETURN = "Error code: " + response.statusCode + ". Please contact system admin or interaction developer for help.";
			} else {

				RETURN = 	'Domain name: ' + body.data.name_display + '\r\n' +
							'Description: ' + body.data.description + '\r\n' +
							'Interactions: ' + body.data.interactions + '\r\n' +
							'Keys: ' + body.data.keys + '\r\n' +
							'User: ' + body.data.user + '\r\n' +
							'Pending Interactions: ' + body.data.pending_interactions;
			}

		  //connect.succeed must be returned to exports.handler last after your interaction code run
		  return context.succeed(RETURN);
	});
};


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
	};
