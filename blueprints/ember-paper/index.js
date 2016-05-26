'use strict';

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    var _this = this;
    return this.addBowerPackagesToProject([
      {name: 'hammer.js', target:'latest'},
      {name: 'matchMedia', target: '0.2.0'}
    ]).then(function() {
      return _this.addPackagesToProject([
        {name: 'ember-cli-sass', target: 'latest'}
      ]);
    });
  }
};
