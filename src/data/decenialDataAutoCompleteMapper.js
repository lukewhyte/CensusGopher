var output = [],
	buildArr = function (variable) {
		if (typeof variable.id === 'undefined' && variable.children !== 'H' && variable.children !== 'P') {
			output.push({i: variable.concept, v: variable.parent});
		}
	};
_.each(data, buildArr);
output