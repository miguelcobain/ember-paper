import Ember from 'ember';
import layout from '../templates/components/paper-tab';
import { ChildMixin } from 'ember-composability-tools';
import RippleMixin from 'ember-paper/mixins/ripple-mixin';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
const { computed, Component, String: { htmlSafe } } = Ember;

export default Component.extend(ChildMixin, RippleMixin, FocusableMixin, {
  layout,
  tagName: 'md-tab-item',
  classNames: ['md-tab'],
  classNameBindings: ['isSelected:md-active'],
  attributeBindings: ['isSelected:aria-selected', 'href', 'style'],

  rippleContainerSelector: null,

  // <a> tags have brower styles or are usually styled by the user
  // this makes sure that tab item still looks good with an anchor tag
  style: computed('href', function() {
    if (this.get('href')) {
      return htmlSafe('text-decoration: none; border: none;');
    }
  }),

  isSelected: computed('selected', 'value', function() {
    return this.get('selected') === this.get('value');
  }),

  init() {
    this._super(...arguments);
    if (this.get('href')) {
      this.set('tagName', 'a');
    }
  },

  didInsertElement() {
    this._super(...arguments);
    let width = this.element.offsetWidth;
    // this is the initial tab width
    // it is used to calculate if we need pagination or not
    this.set('width', width);
  },

  didRender() {
    this._super(...arguments);
    this.updateDimensions();
  },

  // this method is also called by the parent
  updateDimensions() {
    let left = this.element.offsetLeft;
    // this is the true current width
    // it is used to calculate the ink bar position
    let currentWidth = this.element.offsetWidth;
    this.setProperties({ left, currentWidth });
  },

  click() {
    this.sendAction('onClick', ...arguments);
    this.sendAction('onSelect', this);
  }
});
