'use strict';

var express = require('express'),
	router = express.Router(),
	shoppingList = require('../data/shoppingList');

// gets Shopping list from server

router.get('/', function(req, res) {
	res.send(shoppingList);
	console.log(shoppingList);
	console.log('sending list');
});

// gets Item from server

router.get('/:item', function(req, res) {
	console.log('sending list');
	console.log(req.body);
	for (var i = 0; i < shoppingList.length; i++) {
		if(shoppingList[i].item == req.params.item) {
			res.json(shoppingList[i]);
		}
	}
});

// posts a new item to the server

router.post('/:item', function(req, res) {
	var item = req.params.item,
		id = function() {
			if (shoppingList[0])	{
				return shoppingList[shoppingList.length - 1].id + 1;
			}
			return 1;
		}(),
		newitem = {item: item, id: id};
	shoppingList.push(newitem);
    res.json(shoppingList);
});

// post a new item with assigned ID

router.post('/:item/:id', function(req, res) {
	var item = req.params.item,
		id = req.params.id,
		newitem = {item: item, id: id};
	shoppingList.push(newitem);
    res.json(shoppingList);
});

module.exports = router;