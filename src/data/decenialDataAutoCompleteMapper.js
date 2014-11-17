var output = [],
	buildArr = function (variable) {
		if (typeof variable.id === 'undefined' && variable.children !== 'H' && variable.children !== 'P') {
			output.push({desc: variable.desc, children: variable.children});
		}
	};
_.each(data, buildArr);
output