/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-autocomplete-highlight';

const { NAME_KEY, Component, computed, String: { htmlSafe } } = Ember;

/**
 * @class PaperAutocompleteHighlight
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  layout,
  tagName: 'span',

  flags: '',

  highlight: computed('searchText', 'label', 'flags', function() {
    let text = `${this.get('label')}`;
    let flags = this.get('flags');
    let regex = this.getRegExp(this.get('searchText'), flags);

    let html = text.replace(regex, '<span class="highlight">$&</span>');
    return htmlSafe(html);
  }),

  sanitize(term) {
    if (!term) {
      return term;
    }
    return term.replace(/[\\\^\$\*\+\?\.\(\)\|\{}\[\]]/g, '\\$&');
  },

  getRegExp(text, flags) {
    let str = '';
    if (flags.indexOf('^') >= 1) {
      str += '^';
    }
    str += text;
    if (flags.indexOf('$') >= 1) {
      str += '$';
    }
    return new RegExp(this.sanitize(str), flags.replace(/[\$\^]/g, ''));
  }

});

PaperComponent[NAME_KEY] = 'paper-autocomplete-highlight';

export default PaperComponent;
