/* eslint-env node */
'use strict';

const { default: BuildTimeComponent } = require('ember-ast-helpers/build-time-component');

module.exports = class PaperCardTitleMedia extends BuildTimeComponent {
  constructor() {
    super(...arguments);
    this.tagName = 'md-card-title-media';
    this.size = 'md';
    this.layout`
    {{#if hasBlock}}
      <div class="md-media-{{size}}">
        {{yield}}
      </div>
    {{else}}
      <img class="md-media-{{size}}" src={{src}} alt={{alt}} title={{title}} />
    {{/if}}
    `;
  }
};
