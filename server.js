// Module dependencies.
var application_root = __dirname,
  express = require( 'express' ), //Web framework
  path = require( 'path' ), //Utilities for dealing with file paths
  mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();

//Where to serve static content
app.use( express.static(path.join( application_root, 'src')));

//Start server
var port = 4711;

app.listen( port, function () {
  console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});

// Routes
app.get( '/api', function (request, response) {
  response.send( 'CensusGopher API is running' );
});

//Connect to database
mongoose.connect('mongodb://localhost/censusgopher_db');

//Schemas
var Data = new mongoose.Schema({
    label: String,
    concept: String,
    id: String,
    parent: String,
    children: String,
    cells: Number
  }, {
    collection: 'decenialData'
  });

//Models
var DataModel = mongoose.model('Data', Data);

//Get some variables
app.get('/api/vars/:children', function (request, response) {
  return DataModel.find({parent: request.params.children}, function (err, vars) {
    if( !err ) {
      return response.send(vars);
    } else {
      return console.log( err );
    }
  });
});