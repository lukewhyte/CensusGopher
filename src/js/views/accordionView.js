var collection = require('../collections/decenialCollection.js'),
  router = require('../router/router.js'),
  MenuView = require('./menuView.js'),
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
      this.listenTo(this.collection, 'reset', this.closeAll);
    },

    buildSearch: function () {
    	this.search = new SearchView({data: 'decenialDataAutoComplete.json', parentCollection: this.collection});
    	this.search.$el.fadeIn();
    	this.$el.css('margin-top', '70px');
    },

    render: function (menu) {
    	menu.$el.addClass('topMenu'); 
      this.$el.append(menu.el);
      router.navigate('home')
    },

    closeAll: function () {
      if (this.collection.length === 0) {
        this.close(this.search);
        this.close(this);
      }
    },

    close: function (view) {
      view.remove();
      view.unbind();
    }
  });

module.exports = AccordionView;