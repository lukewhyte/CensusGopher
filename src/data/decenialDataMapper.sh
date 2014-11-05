script=`cat decenialDataMapper.js`
autocomplete=`cat decenialDataAutoCompleteMapper.js`
cat json/variables.json | 
underscore process "$script" -o json/decenialData.json --outfmt dense
cat json/decenialData.json |
underscore process "$autocomplete" -o json/decenialDataAutoComplete.json --outfmt dense