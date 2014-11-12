var MenuItemView = require('./variableView.js'),
  MenuView = Backbone.View.extend({
    tagName: 'ul',

    initialize: function (menus) {
      _.bindAll(this, 'renderItems');
      this.subViews = [];
      this.render();
      this.listenTo(this.collection, 'reset', this.render);
    },

    renderItems: function (model) {
      var variable = new MenuItemView({model: model});
      this.subViews.push(variable);
      this.$el.append(variable.el);
    },

    render: function () {
      _.each(this.subViews, this.close);
      this.subViews = [];
      this.collection.each(function (model) {
        this.renderItems(model);
      }, this);
    },

    close: function (view) {
      view.remove();
      view.unbind();
    }
  });

module.exports = MenuView;