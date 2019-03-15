/**
 * @module ember-paper
 */
import Component from '@ember/component';

import { computed } from '@ember/object';
import layout from 'ember-paper/templates/components/paper-autocomplete/highlight/template';

/**
 * @class PaperAutocompleteHighlight
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'span',
  flags: '',

  tokens: computed('regex', 'label', function() {
    let string = `${this.get('label')}`;
    let regex = this.get('regex');

    let tokens = [];
    let lastIndex = 0;

    // Use replace here, because it supports global and single regular expressions at same time.
    string.replace(regex, (match, index) => {
      let prev = string.slice(lastIndex, index);
      if (prev) {
        tokens.push({
          text: prev,
          isMatch: false
        });
      }

      tokens.push({
        text: match,
        isMatch: true
      });

      lastIndex = index + match.length;
    });

    // Append the missing text as a token.
    let last = string.slice(lastIndex);
    if (last) {
      tokens.push({
        text: last,
        isMatch: false
      });
    }

    return tokens;
  }),

  regex: computed('searchText', 'flags', function() {
    let flags = this.get('flags');
    let text = this.get('searchText');
    return this.getRegExp(text, flags);
  }),

  getRegExp(term, flags) {
    let startFlag = '';
    let endFlag = '';
    let regexTerm = this.sanitizeRegex(term);

    if (flags.indexOf('^') >= 0) {
      startFlag = '^';
    }

    if (flags.indexOf('$') >= 0) {
      endFlag = '$';
    }

    return new RegExp(startFlag + regexTerm + endFlag, flags.replace(/[$^]/g, ''));
  },

  sanitizeRegex(term) {
    return term && term.toString().replace(/[\\^$*+?.()|{}[\]]/g, '\\$&');
  }

});
