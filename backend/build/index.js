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

	var _nodeFetch = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"node-fetch\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

	__webpack_require__(3).config();
	// import app from './app';
	// server.use('/hello', app);

	var app = (0, _express2['default'])();
	var client = new _coinbase.Client({
	  'apiKey': process.env.API_KEY,
	  'apiSecret': process.env.API_SECRET,
	  'version': '2017-09-23'
	});
	var port = process.env.PORT || 4000;

	app.get('/coinbase', function (req, res) {
	  client.getBuyPrice({
	    'currencyPair': 'BTC-USD'
	  }, function (err, obj) {
	    res.send('total amount: ' + obj.data.amount);
	  });
	});

	app.get('/gemini', function (req, res) {
	  var url = "https://api.gemini.com/v1/pubticker/btcusd";
	  (0, _nodeFetch2['default'])(url).then(function (response) {
	    response.json().then(function (json) {
	      res.send('last amount: ' + json.last);
	    });
	  })['catch'](function (error) {
	    console.log(error);
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
/* 3 */
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ }
/******/ ]);