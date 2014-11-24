var predator = require('./viewPredator.js'),
  QueryView = require('./queryView.js'),
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
      var currSearch = _.last(this.collection.url.split('/')),
      models = predator.prepNewView('query');
      models.push(this.model.get('id'));

      new QueryView(models, currSearch);
      this.collection.reset(); // Tank this thing
    }
  });

module.exports = MenuItemView;