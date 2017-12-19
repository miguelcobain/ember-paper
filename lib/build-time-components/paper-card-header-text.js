/* eslint-env node */
'use strict';

const { default: BuildTimeComponent } = require('ember-ast-helpers/build-time-component');
const PaperCardHeaderTitle = require('./paper-card-header-title');
const PaperCardHeaderSubhead = require('./paper-card-header-subhead');

module.exports = class PaperCardHeaderText extends BuildTimeComponent {
  constructor() {
    super(...arguments);
    this.tagName = 'md-card-header-text';
    this.contentVisitor = {
      BlockStatement: (node) => {
        let [componentAlias] = this.node.program.blockParams;
        if (componentAlias !== undefined) {
          if (node.path.original === `${componentAlias}.title`) {
            return new PaperCardHeaderTitle(node).toElement();
          } else if (node.path.original === `${componentAlias}.subhead`) {
            return new PaperCardHeaderSubhead(node).toElement();
          }
        }
      }
    };
  }
};
