var model = require('../models/decenialModels.js'),
	DecenialCollection = Backbone.Collection.extend({
		model: model,
		url: '/api/vars/',

		parse: function (response) {
			return _.chain(response).sortBy(function (model) {
					return model.concept;
				}).sortBy(function (model) {
					return model.label;
				}).value();
		}
	});

module.exports = new DecenialCollection();