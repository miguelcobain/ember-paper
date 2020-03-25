/**
 * @module ember-paper
 */
import { tagName, layout, classNames, classNameBindings, attributeBindings } from '@ember-decorators/component';

import { reads } from '@ember/object/computed';
import Component from '@ember/component';
import { action } from '@ember/object';
import template from './template';
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
@layout(template)
@tagName('button')
@classNames( 'md-default-theme', 'md-button' )
@attributeBindings(
  'type',
  'href',
  'target',
  'title',
  'download',
  'rel'
)
@classNameBindings(
  'raised:md-raised',
  'iconButton:md-icon-button',
  'fab:md-fab',
  'mini:md-mini')
export default class PaperButton extends Component.extend(FocusableMixin, ColorMixin, ProxiableMixin) {
  raised = false;
  iconButton = false;
  @reads('mini') fab; // circular button
  mini = false;
  type = 'button';
  href = null;
  target = null;

  init() {
    super.init(...arguments);
    if (this.get('href')) {
      this.setProperties({
        tagName: 'a',
        type: null
      });
    }
  }

  didInsertElement() {
    super.willDestroyElement(...arguments);
    this.element.addEventListener('click', this.handleClick.bind(this));
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    this.element.removeEventListener('click', this.handleClick.bind(this));
  }

  @action
  handleClick(e) {
    invokeAction(this, 'onClick', e);
    // Prevent bubbling, if specified. If undefined, the event will bubble.
    return this.get('bubbles');
  }
}
