'use strict';

var express = require('express'),
	router = express.Router(),
	shoppingList = require('../data/shoppingList');

// gets Shopping list from server

router.get('/', function(req, res) {
	res.json(shoppingList);
});

// gets Item from server

router.get('/:name', function(req, res) {
	console.log('sending list');
	console.log(req.body);
	for (var i = 0; i < shoppingList.length; i++) {
		if(shoppingList[i].name == req.params.name) {
			res.json(shoppingList[i]);
		}
	}
});

module.exports = router;