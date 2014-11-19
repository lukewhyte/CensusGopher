var DecenialData = Backbone.Model.extend({
	defaults: {
		desc: '',
		parent: '',
		subDesc: '',
		callToAction: 'Click to explore',
		children: null,
		cells: null,
		id: null
	},

	parse: function (model) {
		if (typeof model.id !== 'undefined') {
			model.subDesc = 'This is a variable that will return ' + model.cells + ' pieces of data';
			model.callToAction = 'Click to add to your query';
		} else model.subDesc = 'This menu has ' + model.cells + ' sub-menus/variables';
		return model;
	}
});

module.exports = DecenialData;