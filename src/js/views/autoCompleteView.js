var jqueryUI = require('../vendor/jquery-ui.min.js'),
	menuCollection = require('../collections/decenialCollection.js'),
	AutocompleteModel = Backbone.Model.extend(),
	AutocompleteCollection = Backbone.Collection.extend({
		model: AutocompleteModel
	}),
	SearchView = Backbone.View.extend({
		el: '#search',
		template: _.template($('#searchTemplate').html()),

		events: {
			'keypress input': 'findMenus'
		},

		initialize: function (dataFile) {
			var that = this;
			this.collection = new AutocompleteCollection();
			this.collection.fetch({
				url: '../../data/json/' + dataFile,
				success: that.render()
			});
		},

		render: function () {
			var that = this;
			this.$el.html(this.template);
			this.$input = this.$el.children('input');
			this.$input.autocomplete({
				source: [],
				select: function (e, ui) {that.buildMenu(ui)}
			});
		},

		findMenus: function (e) {
			var str = $(e.target).val(),
				result = [];
			if (str.length > 1) {
				this.collection.each(function (model) {
					var i = model.get('i');
					if (i.indexOf(str) !== -1) result.push(i);
				});
				this.$input.autocomplete({source: result})
			}
		},

		buildMenu: function (ui) {
			var model = this.collection.findWhere({i: ui.item.value});
			menuCollection.url = '/api/vars/' + model.get('v');
      menuCollection.fetch({
        reset: true,
        error: function () {}
      });
		}
	});

module.exports = SearchView;