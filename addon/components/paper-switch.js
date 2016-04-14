import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from 'ember-paper/mixins/ripple-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
const {
  assert,
  computed,
  run,
  String: {
    htmlSafe
  },
  inject
} = Ember;
/* global Hammer */

export default BaseFocusable.extend(RippleMixin, ProxiableMixin, ColorMixin, {
  tagName: 'md-switch',
  classNames: ['paper-switch', 'md-default-theme'],
  classNameBindings: ['value:md-checked', 'dragging:md-dragging'],
  toggle: true,

  /* Ripple Overrides */
  rippleContainerSelector: '.md-thumb',
  center: true,
  dimBackground: false,
  fitRipple: true,

  value: false,
  disabled: false,
  dragging: false,

  constants: inject.service(),

  thumbContainerStyle: computed('dragging', 'dragAmount', function() {
    if (!this.get('dragging')) {
      return htmlSafe('');
    }

    let translate = Math.max(0, Math.min(100, this.get('dragAmount') * 100));
    let transformProp = `translate3d(${translate}%, 0, 0)`;
    return htmlSafe(`transform: ${transformProp};-webkit-transform: ${transformProp}`);
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
    assert('{{paper-switch}} requires an `onChange` action', !!this.get('onChange'));
  },

  willDestroyElement() {
    this._super(...arguments);
    this._teardownSwitch();
  },

  didUpdateAttrs() {
    this._super(...arguments);

    if (!this.get('disabled') && !this._switchContainerHammer) {
      this._setupSwitch();
    } else if (!this.get('disabled') && this._switchContainerHammer) {
      this._switchContainerHammer.set({ enable: true });
    } else if (this.get('disabled') && this._switchContainerHammer) {
      this._switchContainerHammer.set({ enable: false });
    }
  },

  _setupSwitch() {
    this.set('switchWidth', this.$('.md-bar').width());

    // Enable dragging the switch
    let switchContainer = this.$('.md-container').get(0);
    let switchContainerHammer = new Hammer(switchContainer);
    this._switchContainerHammer = switchContainerHammer;
    switchContainerHammer.get('pan').set({ threshold: 1 });
    switchContainerHammer.on('panstart', run.bind(this, this._dragStart));
    switchContainerHammer.on('panmove', run.bind(this, this._drag));
    switchContainerHammer.on('panend', run.bind(this, this._dragEnd));

    let switchHammer = new Hammer(this.element);
    this._switchHammer = switchHammer;
    switchHammer.on('tap', run.bind(this, this._dragEnd));
  },

  _teardownSwitch() {
    if (this._switchContainerHammer) {
      this._switchContainerHammer.destroy();
      this._switchHammer.destroy();
    }
  },

  _dragStart() {
    this.set('dragAmount', +this.get('value'));
    this.set('dragging', true);
  },

  _drag(event) {
    if (!this.get('disabled')) {
      // Set the amount the switch has been dragged
      this.set('dragAmount', +this.get('value') + event.deltaX / this.get('switchWidth'));
    }
  },

  _dragEnd() {
    if (!this.get('disabled')) {
      let value = this.get('value');
      let dragAmount = this.get('dragAmount');

      if (!this.get('dragging') || (value && dragAmount < 0.5) || (!value && dragAmount > 0.5)) {
        this.sendAction('onChange', !value);
      }
      this.set('dragging', false);
      this.set('dragAmount', null);
    }
  },

  keyPress(ev) {
    if (ev.which === this.get('constants.KEYCODE.SPACE') || ev.which === this.get('constants.KEYCODE.ENTER')) {
      ev.preventDefault();
      this._dragEnd();
    }
  },

  processProxy() {
    this.sendAction('onChange', !this.get('value'));
  }

});
