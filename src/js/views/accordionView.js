var appCore = require('./menuView.js'),
  AccordionView = Backbone.View.extend({
    el: '.accordion',

    initialize: function (initialMenu) {
      var intialCollection = new appCore.DecenialCollection(initialMenu),
        variables = new appCore.MenuView(intialCollection);    
      variables.$el.addClass('topMenu'); 
      this.$el.append(variables.el);
    }
  });

module.exports = AccordionView;