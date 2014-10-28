var collection = require('../collections/decenialCollection.js'),

  MenuItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'slide',
    template: _.template($('#variableTemplate').html()),

    initialize: function () {
      this.collection = collection;
      this.render();
    },

    render: function () {
      this.$el.append(this.template(this.model.attributes));
    },

    events: {
      'click': 'ifIsMenu',
      'click li.sub-menu': 'buildSubMenu'
    },

    ifIsMenu: function (e) {
      var $target = $(e.target);
      if ($target.is('.slide h2')) {
        if (!$target.hasClass('active')) this.openNewMenu($target);
        else this.closeThisMenu($target);
      }
    },

    buildSubMenu: function (collection) {
      var children = this.model.get('children'),
        that = this;

      this.collection.url = '/api/vars/' + children;
      this.collection.fetch({
        reset: true,
        error: that.handleError
      });
    },

    handleError: function () {
      this.$el.find('li.sub-menu').html('We\'re sorry, we can\'t find the content you\'re looking for');
    },

    openNewMenu: function ($newMenu) {
      //this.$el.find('ul').slideUp('fast');
      //this.$el.find('.slide h2').removeClass('active');
      $newMenu.addClass('active').next('ul').slideDown();
    },

    closeThisMenu: function ($currMenu) {
      $currMenu.removeClass('active').next('ul').slideUp();
    }
  });

module.exports = MenuItemView;