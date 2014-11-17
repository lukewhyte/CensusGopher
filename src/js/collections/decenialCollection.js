var model = require('../models/decenialModels.js'),
	DecenialCollection = Backbone.Collection.extend({
		model: model,
		url: '/api/vars/',

		parse: function (response) {
			return _.chain(response).sortBy(function (model) {
					return model.desc.split(' - ')[1];
				}).sortBy(function (model) {
					return model.desc.split(' - ')[0];
				}).value();
		}
	});

module.exports = new DecenialCollection();