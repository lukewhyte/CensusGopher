var input = data["census-api"].vars.var,
	result = {
		tunnels: {
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
	tunnels = result.tunnels;

input = filter(input, function (obj) { return obj["xml$id"].length > 7; });

each(input, function (obj, index, arr) { 
	var id = obj["xml$id"],
		result = {
			title: obj.label,
			desc: obj.concept,
			gate: null,
			key: null
		},
		createVar = function (parent) {
			result.key = id;
			tunnels[parent].push(result);
		},
		secLevel = (id.charAt(1) === "C") ? id.slice(0, 6) : id.slice(0, 4);
		thirdLevel = secLevel + id.charAt(secLevel.length);

	if (!tunnels[secLevel]) tunnels[secLevel] = [];

	if (/^[a-z]+$/i.test(id.charAt(secLevel.length))) {
	 if (!tunnels[thirdLevel]) {
			var toAdd = {};
			each(arr, function (obj) {
				if (obj["xml$id"] === thirdLevel + "0001" || obj["xml$id"] === thirdLevel + "001") {
					toAdd = {
						title: obj["label"],
						desc: obj["concept"],
						gate: thirdLevel
					};
					tunnels[secLevel].push(toAdd);
				}
			});
			tunnels[thirdLevel] = [];
		}
		createVar(thirdLevel);
	} else {
		createVar(secLevel);
	}
});

result