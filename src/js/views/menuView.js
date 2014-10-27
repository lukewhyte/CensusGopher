var DecenialCollection = require('../collections/decenialCollection.js'),
  MenuView = Backbone.View.extend({
    tagName: 'ul',

    initialize: function (menus) {
      _.bindAll(this, 'renderItems');
      this.render();
    },

    renderItems: function (model) {
      var variable = new MenuItemView({model: model});
      this.$el.append(variable.el);
    },

    render: function () {
      this.collection.each(function (model) {
        this.renderItems(model);
      }, this);
    }
  }),

  MenuItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'slide',
    template: _.template($('#variableTemplate').html()),

    initialize: function () {
      this.render();
    },

    render: function () {
      this.$el.append(this.template(this.model.attributes));
      this.onOpen = (this.model.get('id') !== null) ? this.openVariable : this.openNewMenu; // Figures out if this is a variable or a menu w/ children and sets the action
    },

    onOpen: function () {},

    events: {
      'click': 'ifIsMenu'
    },

    ifIsMenu: function (e) {
      var $target = $(e.target);
      if ($target.is('.slide h2')) {
        if (!$target.hasClass('active')) this.onOpen($target);
        else this.closeThisMenu($target);
      }
    },

    buildSubMenu: function (collection) {
      var variables = new MenuView({collection: collection});
      this.$el.find('li.sub-menu').html(variables.el);
    },

    handleError: function () {
      this.$el.find('li.sub-menu').html('We\'re sorry, we can\'t find the content you\'re looking for');
    },

    openNewMenu: function ($newMenu) {
      var children = this.model.get('children'),
        collection = new DecenialCollection(),
        that = this;

      collection.url = '/api/vars/' + children;
      collection.fetch({
        success: function () { that.buildSubMenu(collection) },
        error: that.handleError
      });

      //this.$el.find('ul').slideUp('fast');
      //this.$el.find('.slide h2').removeClass('active');
      $newMenu.addClass('active').next('ul').slideDown();
    },

    closeThisMenu: function ($currMenu) {
      $currMenu.removeClass('active').next('ul').slideUp();
    }
  });

module.exports = {
  MenuView: MenuView,
  DecenialCollection: DecenialCollection
}