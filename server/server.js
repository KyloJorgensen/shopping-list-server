'use strict';

var express = require('express'),
	app = express(),
	path = require('path'),
    config = require('./config/config.server'),
    mainRouter = require('./routers/main.router'),
    shoppingListRouter = require('./routers/shopping-list.router'),
    expressConfig = require('./config/config.middleware')(app);

app.use('/', mainRouter);
app.use('/shoppingList', shoppingListRouter);

app.listen(config.SERVER_PORT, function () {
    console.log(config.SERVER_MESSAGE + " " + config.SERVER_PORT);
});