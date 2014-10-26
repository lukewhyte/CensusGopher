var DecenialCollection = require('../collections/decenialCollection.js'),
  VarView = require('./variableView.js'),
  MenuView = Backbone.View.extend({
    tagName: 'ul',

    initialize: function (menus) {
      _.bindAll(this, 'renderItems');
      this.collection = menus;
      this.render();
    },

    renderItems: function (model) {
      var variable = new VarView({model: model});
      this.$el.append(variable.el);
    },

    render: function () {
      this.collection.each(function (model) {
        this.renderItems(model);
      }, this);
    }
  });

module.exports = {
  MenuView: MenuView,
  DecenialCollection: DecenialCollection
}