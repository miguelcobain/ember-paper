/* eslint-env node */
'use strict';

const { default: BuildTimeComponent } = require('ember-ast-helpers/build-time-component');

module.exports = class PaperCardImage extends BuildTimeComponent {
  constructor() {
    super(...arguments);
    this.tagName = 'img';
    this.classNames = ['md-card-image'];
    this.attributeBindings = ['src', 'title', 'alt'];
  }
};
