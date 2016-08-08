'use strict';

var express = require('express'),
	app = express(),
	path = require('path'),
    variables = require('./config/variables.express'),
    mainRouter = require('./api/main/main.router'),
    itemRouter = require('./api/item/item.router'),
    shoppingList = require('./data/shoppingList'),
    mongoose = require('mongoose');

require('./config/mongoose.connection');
require('./config/config.middleware')(app);
require('./config/routes.express')(app);

app.listen(variables.EXPRESS_PORT, function () {
    console.log(variables.EXPRESS_LISTEN_MESSAGE + " " + variables.EXPRESS_PORT);
});

var runServer = function(callback) {
    // mongoose.connect(variables.EXPRESS_PORT, function(err) {
    //     if (err && callback) {
    //         return callback(err);
    //     }

    //     app.listen(config.PORT, function() {
    //         console.log(variables.EXPRESS_LISTEN_MESSAGEE + variables.EXPRESS_PORT);
    //         if (callback) {
    //            
    //         }
    //     });
    // }); 
    callback();
};

exports.app = app;
exports.storage = shoppingList;
exports.runServer = runServer;