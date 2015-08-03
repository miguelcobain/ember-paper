import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  flags: '',

  highlight: Ember.computed('searchText', 'label', 'flags', function() {
    var unsafeText = Ember.Handlebars.Utils.escapeExpression(this.get('label'));
    var text = unsafeText;
    var flags = this.get('flags');
    var regex = this.getRegExp(this.get('searchText'), flags);
    var html  = text.replace(regex, '<span class="highlight">$&</span>');
    return new Ember.Handlebars.SafeString(html);
  }),

  sanitize(term) {
    if (!term) {
      return term;
    }
    return term.replace(/[\\\^\$\*\+\?\.\(\)\|\{}\[\]]/g, '\\$&');
  },

  getRegExp(text, flags) {
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
