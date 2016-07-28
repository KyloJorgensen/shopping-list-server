'use strict';
var Data = function(self) {
	var data = this;
	this.addItem = function(name, id) {
		if (!(id)) {
			id = 1;
		}
		var data = {};
		data.name = name;
		data.id = id;

		$.ajax({
		    type: 'POST',
		    data: JSON.stringify(data),
		    contentType: 'application/json',
		    url: '/item'
		}).done(function(list) {
	    	console.log('debugs');
	    	console.log(list);
	    	self.updateShoppingList(list);
	    }).fail(function(error){
	    	console.log('error');
	        console.log(error);
	    });
	};

	this.getList = function() {
		$.ajax({
	        url: '/shoppingList/',
	        datatype: 'jsonp',
	        type: 'GET'
	    }).done(function(list) {
			self.updateShoppingList(list);
	    }).fail(function(error){
	        console.log(error);
	    });
	};

	this.deleteItem = function(id) {
		$.ajax({
	        url: '/item/' + id,
	        datatype: 'jsonp',
	        type: 'DELETE'
	    }).done(function(list) {
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
	});

	this.shoppingList = ko.observableArray([]);

	this.updateShoppingList = function(list) {
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