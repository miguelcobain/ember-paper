import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  flags: '',

  highlight: Ember.computed('searchText',function () {
    var unsafeText = Ember.Handlebars.Utils.escapeExpression(this.get('label')),
      text       = unsafeText,
      flags = this.get('flags'),
      regex = this.getRegExp(this.get('searchText'), flags),
      html  = text.replace(regex, '<span class="highlight">$&</span>');
      return new Ember.Handlebars.SafeString(html);
  }),

  sanitize (term) {
    if (!term) {
      return term;
    }
    return term.replace(/[\\\^\$\*\+\?\.\(\)\|\{}\[\]]/g, '\\$&');
  },

  getRegExp (text, flags) {
    var str = '';
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
