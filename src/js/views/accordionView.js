var MenuView = require('./menuView.js'),
	collection = require('../collections/decenialCollection.js'),

  AccordionView = Backbone.View.extend({
    el: '.accordion',

    initialize: function (initialMenu) {
    	var menu = {};
      this.collection = collection;
      collection.reset(initialMenu);
      menu = new MenuView({collection: this.collection});    
      this.render(menu);
    },

    render: function (menu) {
    	menu.$el.addClass('topMenu'); 
      this.$el.append(menu.el);
    }
  });

module.exports = AccordionView;