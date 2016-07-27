'use strict';

var express = require('express'),
	app = express(),
	path = require('path'),
    config = require('./config/config.server'),
    mainRouter = require('./routers/main.router'),
    shoppingListRouter = require('./routers/shopping-list.router'),
    expressConfig = require('./config/config.middleware')(app);
console.log(app.get('root'));

app.use('/', mainRouter);
app.use('/shoppingList', shoppingListRouter);


app.listen(process.env.PORT || config.SERVER_PORT, function () {
    console.log(config.SERVER_MESSAGE + " " + config.SERVER_PORT);
});