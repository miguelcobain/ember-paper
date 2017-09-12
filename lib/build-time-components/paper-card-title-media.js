/* eslint-env node */
'use strict';

const { default: BuildTimeComponent } = require('ember-ast-helpers/build-time-component');

module.exports = class PaperCardTitleMedia extends BuildTimeComponent {
  constructor() {
    super(...arguments);
    this.tagName = 'md-card-title-media';
    this.size = 'md';
  }
};
