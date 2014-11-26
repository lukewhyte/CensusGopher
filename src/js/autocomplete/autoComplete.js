var jqueryUI = require('../vendor/jquery-ui.min.js'),
	AutocompleteModel = Backbone.Model.extend(),
	AutocompleteCollection = Backbone.Collection.extend({
		model: AutocompleteModel
	}),
	SearchView = Backbone.View.extend({
		tagName: 'div',
		id: 'search',
		template: _.template($('#searchTemplate').html()),

		events: {
			'change #searchType': 'flipSearch'
		},

		initialize: function (options) {
			var that = this;
			this.parentCollection = options.parentCollection;
			this.collection = new AutocompleteCollection();
			this.collection.fetch({
				url: '../../data/json/' + options.data,
				success: that.render()
			});
			this.buildSearchOptions();
		},

		render: function () {
			var that = this;
			this.$el.html(this.template).prependTo('section.accordion');
			this.$input = this.$el.children('input');
			this.$input.autocomplete({
				minLength: 2,
				source: function (request, response) {
					return that.search(request, response)
				},
				select: function (e, ui) {
					that.buildMenu(ui);
				}
			});
		},

		buildSearchOptions: function () {
			this.searchCollectionOptions = {
				pageSearch: this.parentCollection,
				wholeDBSearch: this.collection
			};
			this.searchCollection = this.searchCollectionOptions.wholeDBSearch;
		},

		flipSearch: function () {
			if (this.searchCollection === this.searchCollectionOptions.wholeDBSearch) this.searchCollection = this.searchCollectionOptions.pageSearch;
			else this.searchCollection = this.searchCollectionOptions.wholeDBSearch;
		},

		search: function (request, response) {
			response(this.searchCollection.pluck('desc').filter(function (key) {
				return _.every(request.term.split(' '), function (term) {
					return term !== '' && key.toLowerCase().indexOf(term.toLowerCase()) !== -1;
				});
			}));
		},

		buildMenu: function (ui) {
			var model = this.searchCollection.findWhere({'desc': ui.item.value});
			this.parentCollection.url = '/api/vars/' + model.get('children');
      this.parentCollection.fetch({
        reset: true,
        error: function () {}
      });
		}
	});

module.exports = SearchView;