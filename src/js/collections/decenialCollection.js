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
			this.each(function (model) {
				// variableView.js listens for 'checkHidden'
				var concept = model.get(key).toLowerCase();
				if (concept.indexOf(term.toLowerCase()) === -1) model.set({isHidden: true}).trigger('checkHidden');
				else model.set({isHidden: false}).trigger('checkHidden');
			});
		}
	});

module.exports = new DecenialCollection();