// Load any config vars from .env file
require('dotenv').config({ silent: true });
var Sonos = require('sonos').Sonos;
var sonos = new Sonos('192.168.0.25');

exports.handler = function(event, context) {
	// event.input [string] will contain any text submitted along with your command
	// event.client [string] will contain the client the command was submitted from, either "slack" or "sms"
	// event.value [string] will contain any value we are able to parse from event.input
	sonos.currentTrack(console.log);
	context.succeed('YOUR_EPIC_RESPONSE_GOES_HERE');
};