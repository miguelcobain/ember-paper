/* eslint-env node */
'use strict';

const { default: BuildTimeComponent } = require('ember-ast-helpers/build-time-component');
const PaperCardHeaderText = require('./paper-card-header-text');
const PaperCardAvatar = require('./paper-card-avatar');

module.exports = class PaperCardHeader extends BuildTimeComponent {
  constructor() {
    super(...arguments);
    this.tagName = 'md-card-header';
    this.contentVisitor = {
      BlockStatement: (node) => {
        let [componentAlias] = this.node.program.blockParams;
        if (componentAlias !== undefined) {
          if (node.path.original === `${componentAlias}.text`) {
            return new PaperCardHeaderText(node).toElement();
          } else if (node.path.original === `${componentAlias}.avatar`) {
            return new PaperCardAvatar(node).toElement();
          }
        }
      }
    };
  }
};
