script=`cat decenialDataMapper.js`
cat json/variables.json | 
underscore process "$script" -o json/decenialData.json --outfmt dense