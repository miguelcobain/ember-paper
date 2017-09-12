/* eslint-env node */
'use strict';

const { default: BuildTimeComponent } = require('ember-ast-helpers/build-time-component');
const PaperCardIconActions = require('./paper-card-icon-actions');

module.exports = class PaperCardActions extends BuildTimeComponent {
  constructor() {
    super(...arguments);
    this.tagName = 'md-card-actions';
    this.classNameBindings = ['defaultClasses'];
    this.contentVisitor = {
      BlockStatement: (node) => {
        let [componentAlias] = this.node.program.blockParams;
        if (componentAlias !== undefined) {
          if (node.path.original === `${componentAlias}.icons`) {
            return new PaperCardIconActions(node).toElement();
          }
        }
      }
    };
  }

  defaultClassesContent() {
    let attrClass = this.invocationAttrs.class;
    if (!attrClass || (attrClass.type === 'StringLiteral' && attrClass.value.indexOf('layout-') === -1)) {
      return 'layout-row layout-align-end-center';
    }
  }
};
