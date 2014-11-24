var predator = require('./viewPredator.js'),
  VariableView = require('./variableView.js'),
  MenuView = Backbone.View.extend({
    tagName: 'ul',

    initialize: function (menus) {
      _.bindAll(this, 'renderItems');
      this.subViews = [];
      this.render();
      this.listenTo(this.collection, 'reset', this.render);
    },

    renderItems: function (model) {
      var variable = new VariableView({
        model: model,
        collection: this.collection
      });
      this.subViews.push(variable);
      this.$el.append(variable.el);
    },

    render: function () {
      _.each(this.subViews, predator.close);
      this.subViews = [];
      if (this.collection.length !== 0) {
        this.collection.each(function (model) {
          this.renderItems(model);
        }, this);
      }
    }
  });

module.exports = MenuView;