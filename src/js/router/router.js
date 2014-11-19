var collection = require('../collections/decenialCollection.js'),
	Router = Backbone.Router.extend({
		routes: {
			'survey/:survey/:state/:children/*vars': 'pipe'
		},

		initialize: function () {
			this.listenTo(collection, 'reset', this.updateHistory);
		},

		pipe: function (surver, state, children) {
			if (state === 'review') { // as opposed to 'search'
				this.findVars(children);
			}
		},

		findVars: function (children) {
			var that = this;
			collection.url = '/api/vars/' + children;
	    collection.fetch({
	      reset: true,
	      error: function () {}
	    });
	  },

	  updateHistory: function () {
	  	var children = _.last(collection.url.split('/'));
	  	this.navigate('survey/decenial/' + children);
	  }
	}),
	router = new Router();

Backbone.history.start();
module.exports = router;