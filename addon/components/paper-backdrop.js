import Ember from 'ember';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';
const { Component, computed, run, String: { htmlSafe } } = Ember;
/* global Hammer */

export default Component.extend(TransitionMixin, {

  tagName: 'md-backdrop',
  classNames: ['md-default-theme'],
  classNameBindings: ['opaque:md-opaque', 'isLockedOpen:md-locked-open'],
  attributeBindings: ['backdropStyle:style'],

  // TransitionMixin:
  transitionClass: 'ng',
  shouldTransition: computed.bool('opaque'),

  backdropStyle: computed('fixed', 'translateStyle', function() {
    let style = this.get('translateStyle');
    return this.get('fixed') ? htmlSafe(`position:fixed; ${style}`) : style;
  }),

  addDestroyedElementClone(parent, index, clone) {
    parent.append(clone);
  },

  didInsertElement() {
    let backdropHammer = new Hammer(this.element);
    backdropHammer.on('tap', run.bind(this, this._onTap));
    this._backdropHammer = backdropHammer;
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this._backdropHammer) {
      this._backdropHammer.destroy();
    }
  },

  _onTap(e) {
    e.preventDefault();
    if (this.get('ontap')) {
      this.get('ontap')(e);
    }
  }

});
