'use strict';
var express = require('express'),
	path = require('path'),
	router = express.Router();

router.get('/', function(req, res) {
	res.status(200).sendFile(path.join(__dirname , "../..", 'client/index.html'));
});

router.get('/test', function(req, res) {
	res.send('Welcome to the Shopping List REST server!');
});

module.exports = router;