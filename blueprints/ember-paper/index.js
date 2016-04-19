'use strict';

module.exports = {
  normalizeEntityName() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall() {
    var _this = this;
    return this.addBowerPackagesToProject([
      {name: 'hammerjs', target:'latest'},
      {name: 'matchMedia', target: '0.2.0'}
    ]).then(function() {
      return _this.addPackagesToProject([
        {name: 'ember-cli-sass', target: 'latest'}
      ]);
    });
  }
};
