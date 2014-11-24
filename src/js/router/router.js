var searchCollection = require('../collections/decenialCollection.js'),
	queryCollection = require('../collections/queryCollection.js'),
	Router = Backbone.Router.extend({
		routes: {
			'survey/:survey/:state/:gopherHole': 'pipe'
		},

		initialize: function () {
			this.listenTo(searchCollection, 'reset', this.updateSearchHistory);
		},

		pipe: function (survey, state, gopherHole) {
			if (state === 'search') { // as opposed to 'review'
				this.findVars(gopherHole);
			} else {
				this.buildQueryPage(gopherHole);
			}
		},

		findVars: function (children) {
			var that = this;
			searchCollection.url = '/api/vars/' + children;
	    searchCollection.fetch({
	      reset: true,
	      error: function () {}
	    });
	  },

	  updateSearchHistory: function () {
	  	if (Backbone.history.fragment !== '') {
	  		if (searchCollection.length !== 0) {
			  	var children = _.last(searchCollection.url.split('/')),
			  		query = window.location.search;
			  	this.navigate('/survey/decenial/search/' + children + query);
			  }
		  } else {
		  	this.navigate('home');
		  }
	  },

	  updateQueryHistory: function (qString) {
	  	if (queryCollection.length !== 0) {
	  		var ids = queryCollection.pluck('id').join('-');
	  		this.navigate('/survey/decenial/review/' + ids + qString);
	  	}
	  }
	}),
	router = new Router();

Backbone.history.start();
module.exports = router;