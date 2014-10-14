var input = data["census-api"].vars.var,
	tree = {
		branches: {
			topLevel: [
				{
					title: "Housing Variables",
					desc: "",
					gate: "H0001",
					key: null
				},
				{
					title: "Population Variable",
					desc: "",
					gate: "P001",
					key: null
				}
			]
		}
	},
	branches = tree.branches,

	filterInput = function (obj) {
		var pre = obj["xml$id"].charAt(0);
		return obj["xml$id"].length > 7 && (pre === 'H' || pre === 'P'); 
	},

	addToTree = function (obj, index, arr) {
		var id = obj["xml$id"],
			output = {
				label: obj.label,
				concept: obj.concept,
				gate: null,
				key: null
			},
			secLevel = (id.charAt(1) === "C") ? id.slice(0, 6) : id.slice(0, 4),
			thirdLevel = secLevel + id.charAt(secLevel.length),

			createVar = function (parent) {
				output.key = id;
				branches[parent].push(output);
			},

			createGate = function () {
				var toAdd = {};
				each(arr, function (obj) {
					if (obj["xml$id"] === thirdLevel + "0001" || obj["xml$id"] === thirdLevel + "001") {
						newGate = {
							label: obj["label"],
							concept: obj["concept"],
							gate: thirdLevel
						};
						branches[secLevel].push(newGate);
					}
				});
				branches[thirdLevel] = [];
			};

		if (!branches[secLevel]) branches[secLevel] = [];

		if (/^[a-z]+$/i.test(id.charAt(secLevel.length))) {
		 if (!branches[thirdLevel]) {
				createGate();	
			}
			createVar(thirdLevel);
		} else {
			createVar(secLevel);
		}
	},

	formatBranchStrings = function (obj, key, arr) {
		var parse = {
			label: function (str) {
				str = str.replace(/:/g, '');
				str = str.replace(/!!/g, '>');
				return str;
			},
			concept: function (str) {
				str = str.replace(/^(.*?)\. /, '');
				obj.cells = str.slice(str.indexOf('[') + 1, str.indexOf(']'));
				str = str.slice(0, str.indexOf('[')).trim();
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

map(tree.branches, function (arr) {
	if (isArray(arr)) each(arr, formatBranchStrings);
});

tree