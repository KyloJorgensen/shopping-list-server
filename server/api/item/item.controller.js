'use strict';

var path = require('path'),
	Item = require('./item.model'),
	shoppingList = require('../../data/shoppingList');

function MainController() {};

MainController.prototype.getItems = function(req, res) {
	Item.find(function(err, items) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(items);
    });

	// res.json(shoppingList);
};

MainController.prototype.getItem = function(req, res) {
	for (var i = 0; i < shoppingList.length; i++) {
		if(shoppingList[i].name == req.params.name) {
			res.json(shoppingList[i]);
		}
	}
};

// post a new item to the server

MainController.prototype.postItem = function(req, res) {
    Item.create({
        name: req.body.name
    }, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(item);
    });
};

// updates an items name

MainController.prototype.putItem = function(req, res) {
	return new Promise(function(resolve, reject) {
        Item.findOneAndUpdate({_id: req.body.id}, {name: req.body.newName}, {new: true}, function(error, item) {
            if (error) {
                reject(error);
            } else {
                resolve(item);
            }

        });

    }).then(function(item) {
        res.status(200).json(item);
    }).catch(function(error) {
        console.log(error);
    });
};

// route to remove an item off the check list

MainController.prototype.deleteItem = function(req, res) {

	return new Promise(function(resolve, reject) {
        Item.findOneAndRemove({_id: req.params.id}, function(error, item) {

            if (error) {
                reject(error);
            } else {
                resolve(item);
            }

        });

    }).then(function(item) {

        res.status(200).json(item);

    }).catch(function(error) {
        console.log(error);
    });
};

module.exports = MainController.prototype;








