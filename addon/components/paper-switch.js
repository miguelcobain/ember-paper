import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from 'ember-paper/mixins/ripple-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
const { observer, assert } = Ember;
/* globals Hammer */

export default BaseFocusable.extend(RippleMixin, ProxiableMixin, ColorMixin, {
  tagName: 'md-switch',
  classNames: ['paper-switch', 'md-default-theme'],
  classNameBindings: ['checked:md-checked', 'dragging:md-dragging'],
  toggle: true,

  /* Ripple Overrides */
  rippleContainerSelector: '.md-thumb',
  center: true,
  dimBackground: false,
  fitRipple: true,

  checked: false,
  disabled: false,

  dragging: false,
  dragAmount: null,
  switchWidth: null,

  didInsertElement() {
    this._super(...arguments);
    //Only setup if the switch is not disabled
    if (!this.getAttr('disabled')) {
      this._setupSwitch();
    }
  },

  didInitAttrs() {
    this._super(...arguments);
    assert('{{paper-switch}} requires an `onchange` function', this.getAttr('onchange') && typeof this.getAttr('onchange') === 'function');
  },

  willDestroyElement() {
    this._super(...arguments);

    if (this.switchHammer) {
      this.switchHammer.destroy();
    }
    if (this.thumbElementHammer) {
      this.switchHammer.destroy();
    }
  },

  disabledDidChange: observer('disabled', function() {
    this._setupSwitch();
  }),

  _setupSwitch() {
    this.set('switchWidth', this.$('.md-bar').width());

    // Enable dragging the switch
    let element = this.get('element')[0] || this.get('element');
    let thumbElement = element.getElementsByClassName('md-thumb-container')[0];
    let thumbElementHammer = new Hammer(thumbElement);
    this.thumbElementHammer = thumbElementHammer;
    thumbElementHammer.get('pan').set({ threshold: 1 });
    thumbElementHammer.on('panstart', Ember.run.bind(this, this._dragStart));
    thumbElementHammer.on('panmove', Ember.run.bind(this, this._drag));
    thumbElementHammer.on('panend', Ember.run.bind(this, this._dragEnd));

    // Allow the switch to be clicked to toggle the value
    let switchHammer = new Hammer(element);
    this.switchHammer = switchHammer;
    switchHammer.on('tap', Ember.run.bind(this, this._dragEnd));
  },

  _dragStart() {
    this.set('dragging', true);
  },

  _drag(event) {
    if (this.getAttr('disabled')) { return; }

    // Get the amount amount the switch has been dragged
    let percent = event.deltaX / this.get('switchWidth');
    percent = this.getAttr('checked') ? 1 + percent : percent;
    this.set('dragAmount', percent);

    // Make sure that the switch isn't moving past the edges
    let translate = Math.max(0, Math.min(1, percent));
    let transformProp = `translate3d(${100 * translate}%, 0, 0)`;
    this.$('.md-thumb-container').css('transform', transformProp);
    this.$('.md-thumb-container').css('-webkit-transform', transformProp);
  },

  _dragEnd() {
    if (this.getAttr('disabled')) { return; }
    const checked = this.getAttr('checked');
    const dragAmount = this.get('dragAmount');
    if ((!this.get('dragging')) ||
         (checked && dragAmount < 0.5) ||
         (!checked && dragAmount > 0.5)) {
      this.getAttr('onchange')(!checked);
    }

    // Cleanup
    this.$('.md-thumb-container').removeAttr('style');
    this.set('dragging', false);
    this.set('dragAmount', null);
  },

  processProxy() {
    this.getAttr('onchange')(!this.getAttr('checked'));
  },

  click() {
    return false;
  }

});
