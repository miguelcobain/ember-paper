import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from 'ember-paper/mixins/ripple-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
/* globals Hammer */

export default BaseFocusable.extend(RippleMixin, ProxiableMixin, ColorMixin, {
  tagName: 'md-switch',
  classNames: ['paper-switch', 'md-default-theme'],
  classNameBindings: ['checked:md-checked', 'dragging:md-dragging', 'focus:md-focused'],

  attributeBindings: ['tabindex', 'role', 'ariaLabel:aria-label'],
  tabindex: Ember.computed('disabled', function() {
    return this.get('disabled') ? '-1' : '0';
  }),
  role: 'checkbox',

  toggle: true,

  center: true,
  dimBackground: false,
  fitRipple: true,
  rippleContainerSelector: '.md-thumb',

  focus: false,
  checked: false,
  disabled: false,

  dragging: false,
  dragAmount: null,
  switchWidth: null,

  onDidInsertElement: Ember.on('didInsertElement', function() {
    // Don't set up anything if the switch is disabled
    if (this.get('disabled')) { return; }

    this._super();

    this.set('switchWidth', this.$('.md-bar').width());

    // Enable dragging the switch
    var element = this.get('element')[0] || this.get('element');
    var thumbElement = element.getElementsByClassName('md-thumb-container')[0];
    var thumbElementHammer = new Hammer(thumbElement);
    this.thumbElementHammer = thumbElementHammer;
    thumbElementHammer.get('pan').set({ threshold: 1 });
    thumbElementHammer.on('panstart', Ember.run.bind(this, this._dragStart));
    thumbElementHammer.on('panmove', Ember.run.bind(this, this._drag));
    thumbElementHammer.on('panend', Ember.run.bind(this, this._dragEnd));

    // Allow the switch to be clicked to toggle the value
    var switchHammer = new Hammer(element);
    this.switchHammer = switchHammer;
    switchHammer.on('tap', Ember.run.bind(this, this._dragEnd));
  }),

  disabledDidChange: Ember.observer('disabled', function() {
    this.onDidInsertElement();
  }),

  willDestroyElement() {
    this._super(...arguments);

    if (this.switchHammer) {
      this.switchHammer.destroy();
    }
    if (this.thumbElementHammer) {
      this.switchHammer.destroy();
    }
  },

  ariaLabel: Ember.computed('label', function () {
    return this.get("label") || null;
  }),

  keyPress(ev) {
    if (ev.which === KEY_CODE_SPACE) {
      this.switchHammer.emit('tap', ev);
    }
  },

  _dragStart() {
    this.set('dragging', true);
  },

  _drag(event) {
    if (this.get('disabled')) { return; }

    // Get the amount amount the switch has been dragged
    var percent = event.deltaX / this.get('switchWidth');
    percent = this.get('checked') ? 1 + percent : percent;
    this.set('dragAmount', percent);

    // Make sure that the switch isn't moving past the edges
    var translate = Math.max(0, Math.min(1, percent));
    var transformProp = 'translate3d(' + (100 * translate) + '%, 0, 0)';
    this.$('.md-thumb-container').css('transform', transformProp);
    this.$('.md-thumb-container').css('-webkit-transform', transformProp);
  },

  _dragEnd() {
    if (this.get('disabled')) { return; }

    if ((!this.get('dragging')) ||
         (this.get('checked') && this.get('dragAmount') < 0.5) ||
         (!this.get('checked') && this.get('dragAmount') > 0.5)) {
      this.toggleProperty('checked');
    }

    // Cleanup
    this.$('.md-thumb-container').removeAttr('style');
    this.set('dragging', false);
    this.set('dragAmount', null);
  },

  processProxy() {
    this.toggleProperty('checked');
  },

  click() {
    return false;
  }

});
