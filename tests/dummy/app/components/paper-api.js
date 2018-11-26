import Component from '@ember/component';
import { computed } from '@ember/object';
import { typeOf } from '@ember/utils';
import { htmlSafe } from '@ember/string';

const escape = function(text) {
  // Convert backtick markup to <code> element.
  text = text.replace(/`(.*?)`/g, '<code>$1</code>');
  // Convert ** markup to <em> element.
  text = text.replace(/\*\*(.*?)\*\*/g, '<em>$1</em>');
  // Convert * markup to <strong> element.
  text = text.replace(/\*(.*?)\*/g, '<strong>$1</strong>');

  return text ? htmlSafe(text) : '';
};

export default Component.extend({
  tagName: '',
  // As statically-declared properties, these are shared amongst all instances
  // of `ember-api`.
  title: 'Usage',
  header: Object.freeze(['Option', 'Type', 'Description']),
  categorySpec: Object.freeze([]),
  sort: true,

  // Predefined categories.
  color: Object.freeze([
    'Theme colors',
    ['warn', 'boolean', 'Displays the button in the theme\'s warn color.'],
    ['accent', 'boolean', 'Displays the button in the theme\'s Accent color.']
  ]),

  categories: computed('categorySpec', function() {
    let categories = [];
    this.get('categorySpec').forEach((category) => {
      category = typeOf(category) === 'string' ? this.get(category) : category;
      categories.push(this.getEscapedCategory(category));
    });
    return categories;
  }),

  getEscapedCategory(category) {
    let shouldSort = this.get('sort');

    if (shouldSort) {
      category = category.slice().sort(function(a, b) {
        return a[0] < b[0]
          ? -1
          : a[0] > b[0] ? 1 : 0;
      });
    }

    return category.map((row) => {
      return typeOf(row) === 'array'
        ? row.map((cell) => escape(cell))
        : escape(row);
    });
  }

}).reopenClass({
  positionalParams: 'categorySpec'
});
