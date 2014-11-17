var collection = require('../collections/decenialCollection.js'),
	Router = Backbone.Router.extend({
		routes: {
			'survey/:survey/:children': 'findVars'
		},

		initialize: function () {
			this.listenTo(collection, 'reset', this.updateHistory);
		},

		findVars: function (survey, children) {
			var that = this;
			collection.url = '/api/vars/' + children;
	    collection.fetch({
	      reset: true,
	      error: function () {}
	    });
	  },

	  updateHistory: function () {
	  	children = _.last(collection.url.split('/'));
	  	this.navigate('survey/decenial/' + children);
	  }
	});

module.exports = Router;