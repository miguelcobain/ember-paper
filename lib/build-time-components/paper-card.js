/* eslint-env node */
'use strict';

const { default: BuildTimeComponent } = require('ember-ast-helpers/build-time-component');
const PaperCardTitle = require('./paper-card-title');

module.exports = class PaperCard extends BuildTimeComponent {
  constructor() {
    super(...arguments);
    this.tagName = 'md-card';
    this.contentVisitor = {
      BlockStatement: (node) => {
        let [componentAlias] = this.node.program.blockParams;
        if (componentAlias !== undefined) {
          if (node.path.original === `${componentAlias}.title`) {
            return new PaperCardTitle(node).toElement();
          } else if (node.path.original === `${componentAlias}.content`) {
            // TODO (component "paper-card-content")
          } else if (node.path.original === `${componentAlias}.actions`) {
            // TODO (component "paper-card-actions")
          } else if (node.path.original === `${componentAlias}.header`) {
            // TODO (component "paper-card-header")
          } else if (node.path.original === `${componentAlias}.image`) {
            // TODO (component "paper-card-image")
          } else if (node.path.original === `${componentAlias}.media`) {
            // TODO (component "paper-card-media")
          }
        }
      }
    };
  }
};
