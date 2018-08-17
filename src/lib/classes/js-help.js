//Sometimes Javascript needs help, it can make some funny decisions.

//key/val for native typeof return value / what we'll actually return
const TYPES = {
    'undefined'        : 'undefined',
    'number'           : 'number',
    'boolean'          : 'boolean',
    'string'           : 'string',
    '[object Function]': 'function',
    '[object RegExp]'  : 'regexp',
    '[object Array]'   : 'array',
    '[object Date]'    : 'date',
    '[object Error]'   : 'error'
};
const TOSTRING = Object.prototype.toString;

class JavascriptHelpers {
	
	static typeof (o) {
		return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
	}
}

module.exports = JavascriptHelpers; 