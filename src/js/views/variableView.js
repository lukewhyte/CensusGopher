var router = require('../router/router.js'),
  MenuItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'slide',
    template: _.template($('#variableTemplate').html()),

    initialize: function () {
      this.render();
    },

    render: function () {
      this.$el.append(this.template(this.model.attributes));
    },

    events: {
      'click': 'ifIsMenu',
      'click li.sub-menu': 'buildSubMenu',
      'click li.variable': 'addVariable' 
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
      $newMenu.addClass('active').next('ul').slideDown();
    },

    closeThisMenu: function ($currMenu) {
      $currMenu.removeClass('active').next('ul').slideUp();
    },

    addVariable: function (e) {
      var urlArr = Backbone.history.fragment.split('/');
      urlArr[2] = 'review';

      this.collection.url = '/api/vars/' + this.model.get('id');
      console.log(this.collection.url);
      this.collection.reset();
      router.navigate(urlArr.join('/'), {trigger: true});
    }
  });

module.exports = MenuItemView;