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
		},

		searchCurrPage: function (term, key) {
			var toRemove = this.pluck(key).filter(function (i) {
				return i.indexOf(term) === -1;
			});
			this.remove(toRemove);
		}
	});

module.exports = new DecenialCollection();