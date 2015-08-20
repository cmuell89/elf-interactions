// Load any config vars from .env file
require('dotenv').config({ silent: true });
var request = require('request');

exports.handler = function(event, context) {

	// RETURN for context.succeed must exist. Variable should be used for
	// error handling. RETURN will be master data object.
	var RETURN = "Interaction success.";
	var rt_api = event.keys.rt_api;
	var RT_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=16&page=1&country=us&apikey=' + rt_api


	request.get(RT_URL, function(error, response, body){
			if(!error && response.statusCode == 200){

			}else()


	}


		);
	
		  //connect.succeed must be returned to exports.handler last after your interaction code run
		  context.succeed(RETURN);

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
	};
  context.succeed('YOUR_EPIC_RESPONSE_GOES_HERE');
};