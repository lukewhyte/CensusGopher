var App = require('./views/accordionView.js'),
	Router = require('./router/router.js'),
	initialMenus = [
		{
			desc: '2010 Decennial US Census - Compiled once every 10 years',
			children: 'decenialTop',
			subDesc: 'This menu has 2 sub-menus/variables',
			collection: 'decenial'
		},
		{
			desc: '2013 American Community Survey 1-year - Compiled once a year'
		},
		{
			desc: '2011-2013 American Community Survey 3-year - Compiled once every 3 years'
		},
		{
			desc: '2009-2013 American Community Survey 5-year - Compiled once every 5 years'
		}
	];

$(function () {
	new App(initialMenus);
	new Router();
	Backbone.history.start();
});