'use strict';

var express = require('express'),
	app = express(),
	path = require('path'),
    config = require('./config/config.server'),
    mainRouter = require('./routers/main.router'),
    shoppingListRouter = require('./routers/shopping-list.router'),
    itemRouter = require('./routers/item.router'),
    expressConfig = require('./config/config.middleware')(app),
    shoppingList = require('./data/shoppingList');

app.use('/', mainRouter);
app.use('/shoppingList', shoppingListRouter);
app.use('/item', itemRouter);

app.listen(config.SERVER_PORT, function () {
    console.log(config.SERVER_MESSAGE + " " + config.SERVER_PORT);
});

exports.app = app;
exports.storage = shoppingList;