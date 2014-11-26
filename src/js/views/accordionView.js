var collection = require('../collections/decenialCollection.js'),
  router = require('../router/router.js'),
  predator = require('./viewPredator.js'),
  MenuView = require('./menuView.js'),
	SearchView = require('../autocomplete/autoComplete.js'),

  AccordionView = Backbone.View.extend({
    el: '.accordion',
    search: {},
    menu: false,
    title: '<h1>Click the survey you&#039;d like to query:</h1>',

    initialize: function (initialMenu) {
      this.collection = collection;
      if (initialMenu) collection.reset(initialMenu);
          
      this.render();
      this.listenToOnce(this.collection, 'reset', this.buildSearch);
      this.listenTo(this.collection, 'reset', function () {
        this.render();
        this.removeIfEmpty();
      });
    },

    buildSearch: function () {
    	this.search = new SearchView({data: 'decenialDataAutoComplete.json', parentCollection: this.collection});
    	this.search.$el.fadeIn();
    	this.$el.css('margin-top', '70px');
    },

    buildMenu: function () {
      this.$el.prepend(this.title);
      this.menu = new MenuView({collection: this.collection});
      this.menu.$el.addClass('topMenu'); 
      this.$el.append(this.menu.el);
    },

    render: function () {
      if (!this.menu) this.buildMenu();
      if (!this.search) this.buildSearch();
    },

    removeIfEmpty: function () {
      if (this.collection.length === 0) {
        predator.closeAll([this.search, this.menu]);
        this.$el.empty();
        this.menu = false;
        this.search = false;
      }
    }
  });

module.exports = AccordionView;