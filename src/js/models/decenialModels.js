var DecenialData = Backbone.Model.extend({
	defaults: {
		label: '',
		concept: '',
		parent: '',
		children: null,
		cells: null,
		id: null
	}
});

module.exports = DecenialData;