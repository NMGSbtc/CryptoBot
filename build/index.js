/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _coinbase = __webpack_require__(2);

	__webpack_require__(4).load();
	// import app from './app';
	// server.use('/hello', app);

	var app = (0, _express2['default'])();
	var client = new _coinbase.Client({
	  'apiKey': process.env.API_KEY,
	  'apiSecret': process.env.API_SECRET,
	  'version': '2017-09-23'
	});
	var port = process.env.PORT || 4000;

	app.get('/', function (req, res) {
	  client.getBuyPrice({ 'currencyPair': 'BTC-USD' }, function (err, obj) {
	    res.send('total amount: ' + obj.data.amount);
	  });
	});

	app.listen(port, function () {
	  console.log('Starting server on port ' + port);
	  console.log(process.env.API_KEY);
	});

	exports['default'] = app;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("coinbase");

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var fs = __webpack_require__(5)

	/*
	 * Parses a string or buffer into an object
	 * @param {String|Buffer} src - source to be parsed
	 * @returns {Object}
	*/
	function parse (src) {
	  var obj = {}

	  // convert Buffers before splitting into lines and processing
	  src.toString().split('\n').forEach(function (line) {
	    // matching "KEY' and 'VAL' in 'KEY=VAL'
	    var keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
	    // matched?
	    if (keyValueArr != null) {
	      var key = keyValueArr[1]

	      // default undefined or missing values to empty string
	      var value = keyValueArr[2] ? keyValueArr[2] : ''

	      // expand newlines in quoted values
	      var len = value ? value.length : 0
	      if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
	        value = value.replace(/\\n/gm, '\n')
	      }

	      // remove any surrounding quotes and extra spaces
	      value = value.replace(/(^['"]|['"]$)/g, '').trim()

	      obj[key] = value
	    }
	  })

	  return obj
	}

	/*
	 * Main entry point into dotenv. Allows configuration before loading .env
	 * @param {Object} options - valid options: path ('.env'), encoding ('utf8')
	 * @returns {Boolean}
	*/
	function config (options) {
	  var path = '.env'
	  var encoding = 'utf8'

	  if (options) {
	    if (options.path) {
	      path = options.path
	    }
	    if (options.encoding) {
	      encoding = options.encoding
	    }
	  }

	  try {
	    // specifying an encoding returns a string instead of a buffer
	    var parsedObj = parse(fs.readFileSync(path, { encoding: encoding }))

	    Object.keys(parsedObj).forEach(function (key) {
	      process.env[key] = process.env[key] || parsedObj[key]
	    })

	    return { parsed: parsedObj }
	  } catch (e) {
	    return { error: e }
	  }
	}

	module.exports.config = config
	module.exports.load = config
	module.exports.parse = parse


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ }
/******/ ]);