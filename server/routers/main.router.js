'use strict';
var express = require('express'),
	path = require('path'),
	router = express.Router();

router.get('/', function(req, res) {
	res.send('Welcome to the Shopping List REST server!');
});

module.exports = router;