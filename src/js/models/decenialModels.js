var DecenialData = Backbone.Model.extend({
	defaults: {
		label: '',
		concept: '',
		parent: '',
		children: null,
		cells: null,
		id: null,
    isHidden: false
	}
});

module.exports = DecenialData;