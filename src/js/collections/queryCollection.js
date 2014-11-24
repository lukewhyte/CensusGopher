var model = require('../models/queryModels.js'),
  QueryCollection = Backbone.Collection.extend({
    model: model
  });

module.exports = new QueryCollection();