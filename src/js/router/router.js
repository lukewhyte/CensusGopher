var collection = require('../collections/decenialCollection.js'),
	QueryView = require('../views/queryView.js'),
	Router = Backbone.Router.extend({
		routes: {
			'survey/:survey/:state/:children': 'pipe',
			'survey/:survey/:state/:children/*vars': 'pipe'
		},

		initialize: function () {
			this.listenTo(collection, 'reset', this.updateHistory);
		},

		pipe: function (survey, state, children, vars) {
			if (state === 'search') { // as opposed to 'review'
				this.findVars(children);
			} else {
				this.buildQueryPage(vars);
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

	  buildQueryPage: function (vars) {
	  	var varsArr = vars.split('/');
	  	new QueryView(varsArr);
	  },

	  updateHistory: function () {
	  	var children = _.last(collection.url.split('/')),
	  		url = Backbone.history.fragment,
	  		urlArr = url.split('/');

	  	if (url === 'home') {
	  		this.navigate('/survey/decenial/search/' + children);
	  	} else {
	  		urlArr[3] = children;
	  		this.navigate(urlArr.join('/'));
	  	}
	  }
	}),
	router = new Router();

Backbone.history.start();
module.exports = router;