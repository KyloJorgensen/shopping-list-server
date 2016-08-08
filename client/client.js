'use strict';
var Data = function(self) {

	var that = this;

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
	    	// self.updateShoppingList(list);
	    	that.getList();
	    }).fail(function(error){
	        console.log(error);
	    });
	};

	this.getList = function() {
		$.ajax({
	        url: '/item',
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
			// self.updateShoppingList(list);
			that.getList();
	    }).fail(function(error){
	        console.log(error);
	    });
	};

	this.changeItemName = function(id, newName) {
		var data = {};
		data.id = id;
		data.newName = newName;

		$.ajax({
		    type: 'PUT',
		    data: JSON.stringify(data),
		    contentType: 'application/json',
		    url: '/item'
		}).done(function(list) {
	    	// self.updateShoppingList(list);
	    	that.getList();
	    }).fail(function(error){
	        console.log(error);
	    });
	};
};

var ViewModel = function() {
	var self = this,
		data = new Data(self);

	this.shoppingList = ko.observableArray([]);

	this.updateShoppingList = function(list) {
		self.shoppingList.splice(0, self.shoppingList().length);
		for (var i = 0; i < list.length; i++) {
			self.shoppingList.push(list[i]);
		}
	};

	this.name = ko.observable();

	this.addItem = function(formElement) {
		event.preventDefault();
		self.validateAddName(self.name());
		self.name('');
	};

	this.validateAddName = function(input) {
		input.toString()
		if (input) {
			data.addItem(input);
		}
	};

	$('ul').on('click', '.item-name', function() {
		self.editMode($(this).parent().parent());
	});

	this.editMode = function(elem) {
		$('.item').show();
		$('.item-edit').hide();
		$(elem).children('.item').hide();
		$(elem).children('.item-edit').show();
	};

	this.editItem = function(formElement) {
		event.preventDefault();
		var id = $(formElement).parent().siblings().children('.item-id').children('.item-id').html(),
			oldName = $(formElement).parent().siblings().children('.item-name').html(),
			newName = $(formElement).children('input').val();
		self.validateEditItem(id, newName, oldName);
	}

	this.validateEditItem = function(id, newName, oldName) {
		if (newName != oldName) {
			data.changeItemName(id, newName);
		}
	};

	this.deleteButton = function(item) {
		data.deleteItem(item._id);
	}

	this.init = function() {
		data.getList();
	}();

};


ko.applyBindings(new ViewModel());