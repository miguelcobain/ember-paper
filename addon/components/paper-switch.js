import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from 'ember-paper/mixins/ripple-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
const {
  assert,
  computed,
  isNone,
  run,
  String: {
    htmlSafe
  }
} = Ember;

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

  thumbContainerStyle: computed('dragging', 'dragAmount', {
    get() {
      if (!this.get('dragging')) {
        return htmlSafe('');
      }
      let percent = this.get('dragAmount');
      let translate = Math.max(0, Math.min(1, percent));
      let transformProp = `translate3d(${100 * translate}%, 0, 0)`;
      return htmlSafe(`
        transform: ${transformProp};
        -webkit-transform: ${transformProp}
      `);
    }
  }),

  didInsertElement() {
    this._super(...arguments);

    // Only setup if the switch is not disabled
    if (!this.get('disabled')) {
      this._setupSwitch();
    }
  },

  didInitAttrs() {
    this._super(...arguments);
    assert('{{paper-switch}} requires an `onchange` function', this.get('onchange') && typeof this.get('onchange') === 'function');
  },

  willDestroyElement() {
    this._super(...arguments);

    if (this._switchHammer) {
      this._switchHammer.destroy();
    }
    if (this._thumbElementHammer) {
      this._switchHammer.destroy();
    }
  },
  didUpdateAttrs() {
    if (!this.get('disabled') && isNone(this._thumbElementHammer)) {
      this._setupSwitch();
    }
  },
  _setupSwitch() {
    this.set('switchWidth', this.$('.md-bar').width());

    // Enable dragging the switch
    let element = this.get('element')[0] || this.get('element');
    let [thumbElement, ...lastElement] = element.getElementsByClassName('md-thumb-container');
    let thumbElementHammer = new Hammer(thumbElement);
    this._thumbElementHammer = thumbElementHammer;
    thumbElementHammer.get('pan').set({ threshold: 1 });
    thumbElementHammer.on('panstart', run.bind(this, this._dragStart));
    thumbElementHammer.on('panmove', run.bind(this, this._drag));
    thumbElementHammer.on('panend', run.bind(this, this._dragEnd));

    // Allow the switch to be clicked to toggle the value
    let switchHammer = new Hammer(element);
    this._switchHammer = switchHammer;
    switchHammer.on('tap', Ember.run.bind(this, this._dragEnd));
  },

  _dragStart() {
    this.set('dragging', true);
  },

  _drag(event) {
    if (this.get('disabled')) {
      return;
    }

    // Get the amount amount the switch has been dragged
    let percent = event.deltaX / this.get('switchWidth');
    percent = this.get('checked') ? 1 + percent : percent;
    this.set('dragAmount', percent);
  },

  _dragEnd() {
    if (this.get('disabled')) {
      return;
    }
    let checked = this.get('checked');
    let dragAmount = this.get('dragAmount');
    if ((!this.get('dragging')) ||
         (checked && dragAmount < 0.5) ||
         (!checked && dragAmount > 0.5)) {
      this.get('onchange')(!checked);
    }
    this.set('dragging', false);
    this.set('dragAmount', null);
  },

  processProxy() {
    this.get('onchange')(!this.get('checked'));
  },

  click() {
    return false;
  }

});
