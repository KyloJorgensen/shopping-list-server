'use strict';
var Data = function(self) {
	this.addItem = function(input) {
		$.ajax({
	        url: '/shoppingList/' + input,
	        data: {},
	        datatype: 'jsonp',
	        type: 'POST'
	    }).done(function(list) {
	    	console.log('debug2');
	    	self.updateShoppingList(list);
	    }).fail(function(error){
	        console.log(error);
	    });
	};

	this.getList = function() {
		$.ajax({
	        url: '/shoppingList/',
	        datatype: 'jsonp',
	        type: 'GET'
	    }).done(function(list) {
	    	console.log(list);
			self.updateShoppingList(list);
	    }).fail(function(error){
	        console.log(error);
	    });
	};

	this.deleteItem = function(id) {
		$.ajax({
	        url: '/shoppingList/item/' + id,
	        datatype: 'jsonp',
	        type: 'DELETE'
	    }).done(function(list) {
	    	console.log(list);
			self.updateShoppingList(list);
	    }).fail(function(error){
	        console.log(error);
	    });
	};
};

var ViewModel = function() {
	var self = this,
		data = new Data(self);

	$('body').on('click', '.add', function() {
		self.validateInput($('input').val());
		console.log('add');
	});

	this.shoppingList = ko.observableArray([]);

	this.updateShoppingList = function(list) {
		console.log('updateingshoping list');
		self.shoppingList.splice(0, self.shoppingList().length);
		for (var i = 0; i < list.length; i++) {
			self.shoppingList.push(list[i]);
		}
		console.log(self.shoppingList());
	};

	this.validateInput = function(input) {
		input.toString()
		if (input) {
			data.addItem(input);
		}
	};

	this.deleteButton = function(item) {
		data.deleteItem(item.id);
	}

	this.init = function() {
		data.getList();
	}();

};


ko.applyBindings(new ViewModel());