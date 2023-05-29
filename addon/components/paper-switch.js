/* eslint-disable ember/no-classic-components, no-unused-vars, ember/no-mixins, ember/require-tagless-components, ember/no-component-lifecycle-hooks, ember/no-get */
/**
 * @module ember-paper
 */
import { inject as service } from '@ember/service';

import Component from '@ember/component';
import { assert } from '@ember/debug';
import { get, computed } from '@ember/object';
import { bind } from '@ember/runloop';
import { htmlSafe } from '@ember/string';
import layout from '../templates/components/paper-switch';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import { invokeAction } from 'ember-paper/utils/invoke-action';

/* global Hammer */

/**
 * @class PaperSwitch
 * @extends Ember.Component
 * @uses FocusableMixin
 * @uses ColorMixin
 * @uses ProxiableMixin
 */
export default Component.extend(FocusableMixin, ColorMixin, ProxiableMixin, {
  layout,
  tagName: 'md-switch',
  classNames: ['paper-switch', 'md-default-theme'],
  classNameBindings: ['value:md-checked', 'dragging:md-dragging'],
  toggle: true,
  constants: service(),

  value: false,
  disabled: false,
  dragging: false,

  thumbContainerStyle: computed('dragging', 'dragAmount', function() {
    if (!this.dragging) {
      return htmlSafe('');
    }

    let translate = Math.max(0, Math.min(100, this.dragAmount * 100));
    let transformProp = `translate3d(${translate}%, 0, 0)`;
    return htmlSafe(`transform: ${transformProp};-webkit-transform: ${transformProp}`);
  }),

  didInsertElement() {
    this._super(...arguments);

    // Only setup if the switch is not disabled
    if (!this.disabled) {
      this._setupSwitch();
    }
  },

  init() {
    this._super(...arguments);
    assert('{{paper-switch}} requires an `onChange` action or null for no action.', this.onChange !== undefined);
  },

  willDestroyElement() {
    this._super(...arguments);
    this._teardownSwitch();
  },

  didUpdateAttrs() {
    this._super(...arguments);

    if (!this.disabled && !this._switchContainerHammer) {
      this._setupSwitch();
    } else if (!this.disabled && this._switchContainerHammer) {
      this._switchContainerHammer.set({ enable: true });
    } else if (this.disabled && this._switchContainerHammer) {
      this._switchContainerHammer.set({ enable: false });
    }
  },

  _setupSwitch() {
    this.set('switchWidth', this.element.querySelector('.md-thumb-container').offsetWidth);

    let switchContainer = this.element.querySelector('.md-container');
    let switchHammer = new Hammer(switchContainer);
    this._switchContainerHammer = switchHammer;

    // Enable dragging the switch container
    switchHammer.get('pan').set({ threshold: 1 });
    switchHammer.on('panstart', bind(this, this._dragStart))
      .on('panmove', bind(this, this._drag))
      .on('panend', bind(this, this._dragEnd));

    // Enable tapping gesture on the switch
    this._switchHammer = new Hammer(this.element);
    this._switchHammer.on('tap', bind(this, this._dragEnd));

    this._onClickHandleNativeClick = bind(this, this._handleNativeClick);

    this.element.querySelector('.md-container')
      .addEventListener('click', this._onClickHandleNativeClick);

  },

  _handleNativeClick(ev) {
    let bubbles = this.bubbles;

    if (!bubbles) {
      ev.stopPropagation();
    }

    return bubbles;
  },

  _teardownSwitch() {
    if (this._switchContainerHammer) {
      this._switchContainerHammer.destroy();
      this._switchHammer.destroy();
    }
    this.element.querySelector('.md-container')
      .removeEventListener('click', this._onClickHandleNativeClick);
    this._onClickHandleNativeClick = null;
  },

  _dragStart() {
    this.set('dragAmount', +this.value);
    this.set('dragging', true);
  },

  _drag(event) {
    if (!this.disabled) {
      // Set the amount the switch has been dragged
      this.set('dragAmount', +this.value + event.deltaX / this.switchWidth);
    }
  },

  _dragEnd() {
    if (!this.disabled) {
      let value = this.value;
      let dragAmount = this.dragAmount;

      if (!this.dragging || (value && dragAmount < 0.5) || (!value && dragAmount > 0.5)) {
        invokeAction(this, 'onChange', !value);
      }
      this.set('dragging', false);
      this.set('dragAmount', null);
    }
  },

  focusIn() {
    // Focusing in w/o being pressed should use the default behavior
    if (!this.pressed) {
      this._super(...arguments);
    }
  },

  keyPress(ev) {
    if (ev.which === this.get('constants.KEYCODE.SPACE') || ev.which === this.get('constants.KEYCODE.ENTER')) {
      ev.preventDefault();
      this._dragEnd();
    }
  },

  processProxy() {
    invokeAction(this, 'onChange', !this.value);
  }

});
