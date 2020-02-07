/**
 * @module ember-paper
 */
import { reads } from '@ember/object/computed';

import Component from '@ember/component';
import layout from '../templates/components/paper-button';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import { invokeAction } from 'ember-invoke-action';

/**
 * @class PaperButton
 * @extends Ember.Component
 * @uses FocusableMixin
 * @uses ColorMixin
 * @uses ProxiableMixin
 */
export default Component.extend(FocusableMixin, ColorMixin, ProxiableMixin, {
  layout,
  tagName: 'button',
  classNames: ['md-default-theme', 'md-button'],
  raised: false,
  iconButton: false,
  fab: reads('mini'),  // circular button
  mini: false,
  type: 'button',
  href: null,
  target: null,
  attributeBindings: [
    'type',
    'href',
    'target',
    'title',
    'download',
    'rel'
  ],
  classNameBindings: [
    'raised:md-raised',
    'iconButton:md-icon-button',
    'fab:md-fab',
    'mini:md-mini'
  ],

  init() {
    this._super(...arguments);
    if (this.get('href')) {
      this.setProperties({
        tagName: 'a',
        type: null
      });
    }
  },

  click(e) {
    invokeAction(this, 'onClick', e);
    // Prevent bubbling, if specified. If undefined, the event will bubble.
    return this.get('bubbles');
  }
});
