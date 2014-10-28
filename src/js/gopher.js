var app = require('./views/accordionView.js'),
	initialMenus = [
		{
			label: '2010 Decennial US Census',
			concept: 'Compiled once every 10 years',
			children: 'decenialTop',
			cells: 2
		},
		{
			label: '2013 American Community Survey 1-year',
			concept: 'Compiled once a year'
		},
		{
			label: '2011-2013 American Community Survey 3-year',
			concept: 'Compiled once every 3 years'
		},
		{
			label: '2009-2013 American Community Survey 5-year',
			concept: 'Compiled once every 5 years'
		}
	];

$(function () {
	new app(initialMenus);
});