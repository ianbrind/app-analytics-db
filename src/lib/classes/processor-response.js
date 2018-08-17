/*
* @overview Processor response object, this is the interface which the 
* return data for all processors implement. 
*/
const _ = require("lodash");

/*
* @overview Default return status code (HTTP..)  
*/
const DEFAULT_STATUS = 200;

/*
 * @param {Object} err - Error object, if present
 * @param {Object} data - Data response from processor execution
 * @param {Object} status - status code for response
*/
class ProcessorData {

	/*
	* @param {Object} err Error object
	* @param {Object} data Return value of the processor
	* @param {Number} status Optional status, useful for HTTP APIs
	*/
	constructor (err, data, status) {

		//Use node standard of passing an option error object first
		//This makes error checking consistent throughout the processor calls
		this.err = err;

		//Data returned by the processor, e.g users from user search processor
		this.data = data;

		//Optional status, this field is useful for the HTTP api 
		this.status = status || DEFAULT_STATUS;
	}
}

module.exports = ProcessorData;