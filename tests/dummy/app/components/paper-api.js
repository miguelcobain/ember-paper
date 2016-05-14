import Ember from 'ember';

const {
  Component,
  computed,
  typeOf,
  String: { htmlSafe },
  Handlebars: { Utils: { escapeExpression } }
} = Ember;

const escape = function(text) {
  let result = escapeExpression(text);
  // Convert backtick markup, as escaped by escapeExpression to <code> element.
  result = result.replace(/&#x60;(.*?)&#x60;/g, '<code>$1</code>');
  // Convert * markup to <strong> element.
  result = result.replace(/\*(.*)\*/g, '<strong>$1</strong>');
  return htmlSafe(result);
};

export default Component.extend({

  // As statically-declared properties, these are shared amongst all instances
  // of `ember-api`.
  title: 'Usage',
  header: ['Option', 'Type', 'Description'],
  categorySpec: [],

  // Predefined categories.
  color: [
    ['', '', '*Theme colors*'],
    ['warn', 'boolean', 'Displays the button in the theme\'s warn color.'],
    ['accent', 'boolean', 'Displays the button in the theme\'s Accent color.']
  ],

  categories: computed('categorySpec', function() {
    let categories = [];
    this.get('categorySpec').forEach((category) => {
      category = typeOf(category) === 'string' ? this.get(category) : category;
      categories.push(this.getEscapedCategory(category));
    });
    return categories;
  }),

  getEscapedCategory(category) {
    return category.sort(function(a, b) {
      /* jshint -W014 */
      return a[0] < b[0]
                ? -1
                : a[0] > b[0] ? 1 : 0;
    }).map(function(row) {
      return row.map(function(cell) {
        return escape(cell);
      });
    });
  }

}).reopenClass({
  positionalParams: 'categorySpec'
});
