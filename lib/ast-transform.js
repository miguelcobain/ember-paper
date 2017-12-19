/* eslint-env node */
'use strict';

const { traverse } = require('@glimmer/syntax');
const PaperCard = require('./build-time-components/paper-card');
const PaperContent = require('./build-time-components/paper-content');
const PaperIcon = require('./build-time-components/paper-icon');

class AstTransform {
  constructor() {
    this.syntax = null;
  }

  transform(ast) {
    traverse(ast, {
      MustacheStatement: (node) => {
        return this._applyTransform(node);
      },
      BlockStatement: (node) => {
        return this._applyTransform(node);
      }
    });

    return ast;
  }

  _applyTransform(node) {
    switch (node.path.original) {
      case 'paper-card': return new PaperCard(node).toElement();
      case 'paper-content': return new PaperContent(node).toElement();
      case 'paper-icon': return new PaperIcon(node).toElement();
    }
  }
}

function buildAstTransform(/* addon */) {
  return class EmberPaperTransform extends AstTransform {
  };
}

module.exports = buildAstTransform;
