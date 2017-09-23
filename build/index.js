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

	var _nodeFetch = __webpack_require__(3);

	var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

	var _krakenApi = __webpack_require__(4);

	var _krakenApi2 = _interopRequireDefault(_krakenApi);

	__webpack_require__(5).config();
	// import app from './app';
	// server.use('/hello', app);

	var app = (0, _express2['default'])();
	var coinbaseClient = new _coinbase.Client({
	  'apiKey': process.env.COINBASE_API_KEY,
	  'apiSecret': process.env.COINBASE_API_SECRET,
	  'version': '2017-09-23'
	});
	var krakenClient = new _krakenApi2['default'](process.env.KRAKEN_API_KEY, process.env.KRAKEN_PRIVATE_KEY);
	var port = process.env.PORT || 4000;

	app.get('/coinbase', function (req, res) {
	  coinbaseClient.getBuyPrice({
	    'currencyPair': 'BTC-USD'
	  }, function (err, obj) {
	    res.json({
	      'amount': obj.data.amount
	    });
	  });
	});

	app.get('/gemini', function (req, res) {
	  var url = "https://api.gemini.com/v1/pubticker/btcusd";
	  (0, _nodeFetch2['default'])(url).then(function (response) {
	    response.json().then(function (json) {
	      res.json({
	        'amount': json.last
	      });
	    });
	  })['catch'](function (error) {
	    console.log(error);
	  });
	});

	app.get('/kraken', function (req, res) {
	  krakenClient.api('Ticker', {
	    pair: 'XXBTZUSD'
	  }).then(function (json) {
	    res.json({
	      'amount': json.result.XXBTZUSD.c[0]
	    });
	  })['catch'](function (error) {
	    console.log(error);
	  });
	});

	app.listen(port, function () {
	  console.log('Starting server on port ' + port);
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

	module.exports = require("node-fetch");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("kraken-api");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ }
/******/ ]);