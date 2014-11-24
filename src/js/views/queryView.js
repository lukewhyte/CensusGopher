var collection = require('../collections/queryCollection.js'),
  router = require('../router/router.js'),
  QueryView = Backbone.View.extend({
  	el: '.queryPage',
  	template: _.template($('#queryTemplate').html()),

  	initialize: function (modelArr, queryString) {
      var models = _.map(modelArr, function (model) {
        return {id: model};
      });
      this.collection = collection;
      this.collection.reset(models);

      router.updateQueryHistory(queryString);
  		this.render();
  	},

  	render: function () {
  		this.$el.append(this.template());
  	}
  });

module.exports = QueryView;