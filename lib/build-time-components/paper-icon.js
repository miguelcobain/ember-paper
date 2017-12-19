/* eslint-env node */
'use strict';

const { default: BuildTimeComponent, interpolateProperties } = require('ember-ast-helpers/build-time-component');
const { builders: b } = require('@glimmer/syntax');

function buildConditional(cond, truthyValue, falsyValue) {
  let mustacheArgs = [cond];
  mustacheArgs.push(b.string(truthyValue));
  if (falsyValue) {
    mustacheArgs.push(b.string(falsyValue));
  }
  return b.mustache(b.path('if'), mustacheArgs);
}

module.exports = class PaperIcon extends BuildTimeComponent {
  constructor() {
    super(...arguments);
    this.tagName = 'md-icon';
    this.classNames = ['paper-icon', 'md-font', 'material-icons', 'md-default-theme'];
    this.classNameBindings = ['spinClass', 'warn:md-warn', 'accent:md-accent', 'primary:md-primary'];
    this.attributeBindings = ['aria-label', 'title', 'style', 'icon:md-font-icon'];
    this.positionalParams = ['icon'];
    this.icon = '';
    this.spin = false;
    this.reverseSpin = false;
    this.styleContent = interpolateProperties('height: $size$px; min-height: $size$px; min-width: $size$px; font-size: $size$px; line-height: $size$px;', {
      divisor: '$',
      skipIfMissingDynamic: true
    });
    this.layout`{{-paper-underscore icon}}{{yield}}`;
  }

  spinClassContent() {
    let { spin, reverseSpin } = this.invocationAttrs;
    if (spin !== undefined) {
      if (spin.type === 'BooleanLiteral' && spin.value) {
        return 'md-spin';
      } else if (spin.type === 'PathExpression' || spin.type === 'SubExpression') {
        return buildConditional(spin, 'md-spin');
      }
    }
    if (reverseSpin !== undefined) {
      if (reverseSpin.type === 'BooleanLiteral' && reverseSpin.value) {
        return 'md-spin-reverse';
      } else if (reverseSpin.type === 'PathExpression' || reverseSpin.type === 'SubExpression') {
        return buildConditional(reverseSpin, 'md-spin-reverse');
      }
    }
  }

  ['aria-labelContent']() {
    return this.invocationAttrs['aria-label'] || this._getPropertyValue('icon');
  }
};
