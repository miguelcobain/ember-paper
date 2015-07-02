'use strict';

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    var _this = this;
    return this.addBowerPackagesToProject(['hammerjs', 'material-design-icons']).then(function() {
      return _this.addPackagesToProject(['ember-cli-sass']);
    });
  }
};
