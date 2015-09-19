import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';

export default BaseFocusable.extend(RippleMixin, ProxiableMixin, ColorMixin, {
  attributeBindings: ['target', 'action'],
  tagName: 'button',
  themed: true,
  classNameBindings: ['raised:md-raised', 'icon-button:md-icon-button', 'themed:md-default-theme', 'themed:md-button'],

  /* RippleMixin overrides */
  isIconButton: Ember.computed(function() {
    return this.classNames.any(function(className) {
      return className.indexOf('md-icon-button') !== -1;
    });
  }),
  isMenuItem: Ember.computed(function() {
    return this.classNames.any(function(className) {
      return className.indexOf('md-menu-item') !== -1;
    });
  }),
  center: Ember.computed.alias('isIconButton'),
  fitRipple: Ember.computed.alias('isIconButton'),

  dimBackground: Ember.computed.not('isIconButton'),

  //bubble actions by default
  bubbles: true,
  click(event) {
    var target = this.get('target');

    if (target) {
      this.get('target').send(this.get('action'), this.get('param'), event);
    } else {
      this.sendAction('action', this.get('param'), event);
    }

    return this.get('bubbles');
  }
});
