var QueryView = Backbone.View.extend({
	className: 'queryPage',
	template: _.template($('#queryTemplate').html()),

	initialize: function (vars) {
		this.render();
	},

	render: function () {
		this.$el.append(this.template());
	}
});