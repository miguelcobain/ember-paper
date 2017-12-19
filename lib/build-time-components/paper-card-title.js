/* eslint-env node */
'use strict';

const { default: BuildTimeComponent } = require('ember-ast-helpers/build-time-component');
const PaperCardTitleText = require('./paper-card-title-text');
const PaperCardTitleMedia = require('./paper-card-title-media');
module.exports = class PaperCardTitle extends BuildTimeComponent {
  constructor() {
    super(...arguments);
    this.tagName = 'md-card-title';
    let transform = (node) => {
      let [componentAlias] = this.node.program.blockParams;
      if (componentAlias !== undefined) {
        if (node.path.original === `${componentAlias}.text`) {
          return new PaperCardTitleText(node).toElement();
        } else if (node.path.original === `${componentAlias}.media`) {
          return new PaperCardTitleMedia(node).toElement();
        }
      }
    };
    this.contentVisitor = {
      BlockStatement: transform,
      MustacheStatement: transform
    };
  }
};
