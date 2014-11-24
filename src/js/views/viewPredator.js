// If it bleeds, we can unbind and remove it..
var predator = {
  closeAll: function (viewsArr) {
    var that = this;
    _.each(viewsArr, function (view) {
      that.close(view);
    });
  },

  close: function (view) {
    view.remove();
    view.unbind();
  },

  prepNewView: function (variable) {
    var query = window.location.search.substring(1),
      vars = query.split('&');
    _.each(vars, function (v) {
      var pair = v.split('=');
      if (pair[0] == variable) {
        return pair[1].split('-');
      }
    });
    return [];
  }
};

module.exports = predator;