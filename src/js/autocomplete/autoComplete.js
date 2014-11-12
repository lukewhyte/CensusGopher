var jqueryUI = require('../vendor/jquery-ui.min.js'),
	menuCollection = require('../collections/decenialCollection.js'),
	AutocompleteModel = Backbone.Model.extend(),
	AutocompleteCollection = Backbone.Collection.extend({
		model: AutocompleteModel
	}),
	SearchView = Backbone.View.extend({
		el: '#search',
		template: _.template($('#searchTemplate').html()),
		isPageSearch: false,

		events: {
			'keyup input': 'findMenus',
			'change #searchType': 'flipSearch'
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
				select: function (e, ui) { 
					that.buildMenu(ui);
				}
			});
		},

		flipSearch: function () {
			this.isPageSearch = !this.isPageSearch;
			this.$input.autocomplete('option', 'disabled', !this.isPageSearch);
		},

		findMenus: function (e) {
			var str = $(e.target).val();
			if (str.length > 1) {
				if (this.isPageSearch) menuCollection.searchCurrPage(str, 'concept');
				else this.$input.autocomplete({source: this.searchWholeDB(str, 'i')})
			}
		},

		searchWholeDB: function (term, key) {
			return this.collection.pluck(key).filter(function (i) {
				var lowI = i.toLowerCase(),
					lowTerm = term.toLowerCase();
				return lowI.indexOf(lowTerm) !== -1;
			});
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