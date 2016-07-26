'use strict';

var express = require('express'),
	router = express.Router(),
	shoppingList = require('../data/shoppingList');

// updates an items id

router.put('/item/:id', function(req, res) {
	var itemId = req.body.id,
		newId = req.params.id;

	for (var i = 0; i < shoppingList.length; i++) {
		if (shoppingList[i].id == itemId) {
			shoppingList[i].id = newId;
			res.json(shoppingList);
		}
	}
});

// route to remove an item off the check list

router.delete('/item/:id', function(req, res) {
	for (var i = 0; i < shoppingList.length; i++) {
		if(shoppingList[i].id == req.params.id) {
			shoppingList.splice(i, 1);
			res.json(shoppingList);
		}
	}
});

module.exports = router;