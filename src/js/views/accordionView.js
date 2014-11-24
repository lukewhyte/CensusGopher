var collection = require('../collections/decenialCollection.js'),
  router = require('../router/router.js'),
  predator = require('./viewPredator.js'),
  MenuView = require('./menuView.js'),
	SearchView = require('../autocomplete/autoComplete.js'),

  AccordionView = Backbone.View.extend({
    el: '.accordion',

    initialize: function (initialMenu, queryString) {
      this.collection = collection;
      collection.reset(initialMenu);
      this.menu = new MenuView({collection: this.collection});    
      this.render(this.menu);
      this.listenTo(this.collection, 'reset', this.removeIfEmpty);

      if (Backbone.history.fragment.indexOf('search') !== -1) this.buildSearch();
      else this.listenToOnce(this.collection, 'reset', this.buildSearch);

      if (typeof queryString !== 'undefined') {
        router.navigate(Backbone.History.fragment + queryString);
      }
    },

    buildSearch: function () {
    	this.search = new SearchView({data: 'decenialDataAutoComplete.json', parentCollection: this.collection});
    	this.search.$el.fadeIn();
    	this.$el.css('margin-top', '70px');
    },

    render: function () {
    	this.menu.$el.addClass('topMenu'); 
      this.$el.append(this.menu.el);
    },

    removeIfEmpty: function () {
      if (this.collection.length === 0) {
        predator.closeAll([this.search, this.menu, this]);
      }
    }
  });

module.exports = AccordionView;