/* eslint-env node */
'use strict';

const { default: BuildTimeComponent } = require('ember-ast-helpers/build-time-component');

module.exports = class PaperCardHeaderSubhead extends BuildTimeComponent {
  constructor() {
    super(...arguments);
    this.tagName = 'span';
    this.classNames = ['md-subhead'];
  }
};
