var model = require('../models/decenialModels.js'),
	DecenialCollection = Backbone.Collection.extend({
		model: model,
		url: '/api/vars'
	});

module.exports = DecenialCollection;