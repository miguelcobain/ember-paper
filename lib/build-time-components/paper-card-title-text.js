/* eslint-env node */
'use strict';

const { default: BuildTimeComponent } = require('ember-ast-helpers/build-time-component');
const PaperCardHeaderHeadline = require('./paper-card-header-headline');
const PaperCardHeaderSubhead = require('./paper-card-header-subhead');

module.exports = class PaperCardTitleText extends BuildTimeComponent {
  constructor() {
    super(...arguments);
    this.tagName = 'md-card-title-text';
    this.contentVisitor = {
      BlockStatement: (node) => {
        let [componentAlias] = this.node.program.blockParams;
        if (componentAlias !== undefined) {
          if (node.path.original === `${componentAlias}.headline`) {
            return new PaperCardHeaderHeadline(node).toElement();
          } else if (node.path.original === `${componentAlias}.subhead`) {
            return new PaperCardHeaderSubhead(node).toElement();
          }
        }
      }
    };
  }
};
