'use strict';

var express = require('express'),
	router = express.Router(),
	controller = require('./item.controller');

router.get('/', controller.getItems);
router.get('/:id', controller.getItem);
router.post('/', controller.postItem);
router.put('/', controller.putItem);
router.delete('/:id', controller.deleteItem);

module.exports = router;