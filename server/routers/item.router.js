'use strict';

var express = require('express'),
	router = express.Router(),
	shoppingList = require('../data/shoppingList');

// generates Id

function generateID(id) {
	if (validateId(id)) {
		return id;
	}
	return generateNewId();
}

// check if an id is vaild

function validateId(id) {
	var vaildId = true;

	if (!(id > 0)) {
		vaildId = false;
	} 

	for (var i = 0; i < shoppingList.length; i++) {
		if (id == shoppingList[i].id) {
			vaildId = false;
		}
	}
	return vaildId;
}

// generates a new id differnt from any other id in the shoppingList Array and returns it

function generateNewId() {
	for (var i = 1; i <= shoppingList.length + 1; i++) {
		if (validateId(i)) {
			return i;
		}
	}
}

// post a new item to the server

router.post('/', function(req, res) {
	if (req.body.name) {
		var newitem = {name: req.body.name, id: generateID(req.body.id)};
		shoppingList.push(newitem);
		res.json(shoppingList);
	}
});

// updates an items name

router.put('/', function(req, res) {
	var CurrentID = req.body.id,
		newName = req.body.newName;

	for (var i = 0; i < shoppingList.length; i++) {
		if (shoppingList[i].id == CurrentID) {
			if (newName != shoppingList[i].name) {
				shoppingList[i].name = newName;
			}
		}
	}

	res.json(shoppingList);
});

// route to remove an item off the check list

router.delete('/', function(req, res) {
	var id = req.body.id;
	for (var i = 0; i < shoppingList.length; i++) {
		if(shoppingList[i].id == id) {
			shoppingList.splice(i, 1);
			res.json(shoppingList);
		}
	}
});

module.exports = router;