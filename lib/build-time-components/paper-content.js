/* eslint-env node */
'use strict';

const { default: BuildTimeComponent } = require('ember-ast-helpers/build-time-component');

module.exports = class PaperContent extends BuildTimeComponent {
  constructor() {
    super(...arguments);
    this.tagName = 'md-content';
    this.classNames = ['md-default-theme'];
    this.attributeBindings = ['layout-padding', 'scroll-y:md-scroll-y'];
    this.classNameBindings = ['padding:md-padding'];
  }
};
