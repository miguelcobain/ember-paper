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

  didRender() {
    this._super(...arguments);
    let { width } = this.element.getBoundingClientRect();
    let left = this.element.offsetLeft;
    this.setProperties({ width, left });
  },

  click() {
    this.sendAction('onClick', ...arguments);
    this.sendAction('onSelect', this);
  }
});
