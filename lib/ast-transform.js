/* eslint-env node */
'use strict';

const { traverse } = require('@glimmer/syntax');
const PaperCard = require('./build-time-components/paper-card');

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
    if (node.path.original === 'paper-card') {
      return new PaperCard(node).toElement();
    }
  }
}

function buildAstTransform(/* addon */) {
  return class EmberPaperTransform extends AstTransform {
  };
}

module.exports = buildAstTransform;
