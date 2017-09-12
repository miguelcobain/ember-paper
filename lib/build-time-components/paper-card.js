/* eslint-env node */
'use strict';

const { default: BuildTimeComponent } = require('ember-ast-helpers/build-time-component');
const PaperCardTitle = require('./paper-card-title');
const PaperCardContent = require('./paper-card-content');
const PaperCardActions = require('./paper-card-actions');
const PaperCardHeader = require('./paper-card-header');

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
            return new PaperCardContent(node).toElement();
          } else if (node.path.original === `${componentAlias}.actions`) {
            return new PaperCardActions(node).toElement();
          } else if (node.path.original === `${componentAlias}.header`) {
            return new PaperCardHeader(node).toElement();
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
