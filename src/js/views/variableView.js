var appCore = require('./menuView.js'), 
	VariableView = Backbone.View.extend({
	tagName: 'li',
	className: 'slide',
	template: _.template($('#variableTemplate').html()),

	initialize: function () {
		//this.onOpen(); // Figures out if this is a variable or a menu w/ children and sets the action
		this.render();
	},

	render: function () {
		this.$el.append(this.template(this.model.attributes));
	},

	/* Herein lies shit in progress...
	onOpen: function () {
		return (this.model.get('id') !== null) ? this.openVariable : this.openNewMenu;
	},

	events: {
    'click': 'ifIsMenu'
  },

  ifIsMenu: function (e) {
    var $target = $(e.target);
    if ($target.is('.slide h2')) {
      if (!$target.hasClass('active')) this.onOpen();
      else this.closeThisMenu($target);
    }
  },

  openNewMenu: function ($newMenu) {
  	var children = this.model.get('children'),
  		collection = new appCore.DecenialCollection();

  	collection.fetch({parent: children});


    this.$el.find('ul').slideUp('fast');
    this.$el.find('.slide h2').removeClass('active');
    $newMenu.addClass('active').next('ul').slideDown();
  },

  closeThisMenu: function ($currMenu) {
    $currMenu.removeClass('active').next('ul').slideUp();
  } */
});

module.exports = VariableView;