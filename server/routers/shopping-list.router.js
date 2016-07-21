'use strict';
var express = require('express'),
	path = require('path'),
	router = express.Router(),
	shoppingList = ['grape', 'apple'];

router.get('/', function(req, res) {
	res.send(shoppingList);
});

router.get('/:item', function(req, res) {
	for (var i = 0; i < shoppingList.length; i++) {
		if(shoppingList[i] == req.params.item) {
			res.json(shoppingList[i]);
		}
	}
});

router.post('/:item', function(req, res) {
	shoppingList.push(req.params.item);
    res.json(shoppingList);
});

router.delete('/:item', function(req, res) {
	for (var i = 0; i < shoppingList.length; i++) {
		if(shoppingList[i] == req.params.item) {
			shoppingList.splice(i, 1);
			res.json(shoppingList[i]);
		}
	}
});

module.exports = router;