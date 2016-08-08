var itemRouter = require('../api/item/item.router');
var mainRouter = require('../api/main/main.router');

module.exports = function(app) {
    app.use('/', mainRouter);
    app.use('/item', itemRouter);
};