var input = data["census-api"].vars.var, // grab the array of variable objects
	branches = {}, // This object will be used to build a semantic tree structure that will be flattened into result
	result = [],

	filterInput = function (obj) { // We use this to remove all the geographic variables
		var id = obj["xml$id"];
		return id.length > 7 && (id.charAt(0) === 'H' || id.charAt(0) === 'P'); 
	},

	addToTree = function (obj, index, arr) { 
		// Here we take all the variable objects and restructure them into the tree.
		// If no parent (aka 'gate;) exists for a variable type, one will be created
		var id = obj["xml$id"],
			variable = {
				label: obj.label,
				concept: obj.concept,
				id: id,
				parent: null
			},
			secLevel = (id.charAt(1) === "C") ? id.slice(0, 6) : id.slice(0, 4),
			thirdLevel = secLevel + id.charAt(secLevel.length),

			createVar = function (parent) {
				variable.parent = parent;
				branches[parent].push(variable);
			},

			createGate = function (parent, child) {
				var gate = {};
				each(arr, function (obj) {
					if (obj["xml$id"] === child + "0001" || obj["xml$id"] === child + "001") {
						gate = {
							label: obj["label"],
							concept: obj["concept"],
							children: child,
							parent: parent
						};
						branches[secLevel].push(gate);
					}
				});
			};

		if (!branches[secLevel]) { // If the second level obj for this type of variable doesn't exist, create it
			branches[secLevel] = [];
			createGate(id.charAt(0), secLevel);
		}

		if (/^[a-z]+$/i.test(id.charAt(secLevel.length))) { // If this is a third level variable..
		  if (!branches[thirdLevel]) { // If the third level obj for this type of variable doesn't exist, create it
				createGate(secLevel, thirdLevel);
				branches[thirdLevel] = [];
			}
			createVar(thirdLevel); // Create a third level variable
		} else {
			createVar(secLevel); // Create a second level variable
		}
	},

	formatBranchStrings = function (obj, key, arr) { // After we create the tree, we need to format the content
		var parse = {
			label: function (str) {
				return str.replace(/:|!!/g, function (match) {
					return (match === ':') ? '' : '>';
				});
			},
			concept: function (str) {
				var areCells = str.indexOf('[') !== -1;
				obj.cells = areCells ? str.slice(str.indexOf('[') + 1, str.indexOf(']')) : null;
				str = str.replace(/^(.*?)\. /, '');
				if (areCells) str = str.slice(0, str.indexOf('[')).trim();
				return str.charAt(0) + str.slice(1).toLowerCase();
			}
		};
		if (typeof obj.label !== 'undefined') obj.label = parse.label(obj.label);
		if (typeof obj.concept !== 'undefined') obj.concept = parse.concept(obj.concept);
	};

_.chain(input)
	.filter(filterInput)
	.each(addToTree)
	.value();

map(branches, function (arr) {
	if (isArray(arr)) each(arr, formatBranchStrings);
});

each(branches, function (arr) {
	for (var i = 0; i < arr.length; i++) {
		result.push(arr[i]);
	}
});

result