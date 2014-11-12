var MenuView = require('./menuView.js'),
	collection = require('../collections/decenialCollection.js'),
	SearchView = require('../autocomplete/autoComplete.js'),

  AccordionView = Backbone.View.extend({
    el: '.accordion',

    initialize: function (initialMenu) {
    	var menu = {};
      this.collection = collection;
      collection.reset(initialMenu);
      menu = new MenuView({collection: this.collection});    
      this.render(menu);
      this.listenToOnce(this.collection, 'reset', this.buildSearch);
    },

    buildSearch: function () {
    	var search = new SearchView('decenialDataAutoComplete.json');
    	search.$el.fadeIn();
    	this.$el.css('margin-top', '70px');
    },

    render: function (menu) {
    	menu.$el.addClass('topMenu'); 
      this.$el.append(menu.el);
    }
  });

module.exports = AccordionView;