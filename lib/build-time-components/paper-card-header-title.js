/* eslint-env node */
'use strict';

const { default: BuildTimeComponent } = require('ember-ast-helpers/build-time-component');

module.exports = class PaperCardHeaderTitle extends BuildTimeComponent {
  constructor() {
    super(...arguments);
    this.tagName = 'span';
    this.classNames = ['md-title'];
  }
};
