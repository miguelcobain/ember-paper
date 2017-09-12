/* eslint-env node */
'use strict';

const { default: BuildTimeComponent } = require('ember-ast-helpers/build-time-component');

module.exports = class PaperCardContent extends BuildTimeComponent {
  constructor() {
    super(...arguments);
    this.tagName = 'md-card-content';
  }
};
