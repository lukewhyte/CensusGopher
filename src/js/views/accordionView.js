var collection = require('../collections/decenialCollection.js'),
  router = require('../router/router.js'),
  MenuView = require('./menuView.js'),
	SearchView = require('../autocomplete/autoComplete.js'),

  AccordionView = Backbone.View.extend({
    el: '.accordion',

    events: {
      'click .topMenu': 'addVariable' 
    },

    initialize: function (initialMenu) {
    	var menu = {};
      this.collection = collection;
      collection.reset(initialMenu);
      menu = new MenuView({collection: this.collection});    
      this.render(menu);
      this.listenToOnce(this.collection, 'reset', this.buildSearch);
    },

    buildSearch: function () {
    	var search = new SearchView({data: 'decenialDataAutoComplete.json', parentCollection: this.collection});
    	search.$el.fadeIn();
    	this.$el.css('margin-top', '70px');
    },

    render: function (menu) {
    	menu.$el.addClass('topMenu'); 
      this.$el.append(menu.el);
    },

    addVariable: function (e) {
      if ($(e.target).hasClass('variable')) {

      }
    }
  });

module.exports = AccordionView;