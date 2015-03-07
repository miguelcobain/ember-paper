import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';

export default BaseFocusable.extend(RippleMixin,{
  tagName: 'md-switch',
  classNames: ['paper-switch', 'md-default-theme'],
  classNameBindings: ['checked:md-checked', 'dragging:md-dragging'],
  toggle: true,

  center: true,
  rippleContainerSelector: '.md-thumb',

  checked: false,
  disabled: false,

  dragging: false,
  dragAmount: null,
  switchWidth: null,


  _setupSwitchDragging: function() {
    // Don't set up anything if the switch is disabled
    if (this.get('disabled')) { return; }

    this.set('switchWidth', this.$('.md-bar').width());

    // Enable dragging the switch
    var element = this.get('element')[0] || this.get('element');
    var thumbElement = element.getElementsByClassName('md-thumb-container')[0];
    var thumbElementHammer = new Hammer(thumbElement);
    thumbElementHammer.get('pan').set({ threshold: 1 });
    thumbElementHammer.on('panstart', Ember.run.bind(this, this._dragStart));
    thumbElementHammer.on('panmove', Ember.run.bind(this, this._drag));
    thumbElementHammer.on('panend', Ember.run.bind(this, this._dragEnd));

    // Allow the switch to be clicked to toggle the value
    var switchHammer = new Hammer(element);
    switchHammer.on('tap', Ember.run.bind(this, this._dragEnd));
  }.on('didInsertElement').observes('disabled'),


  _dragStart: function() {
    this.set('dragging', true);
  },


  _drag: function(event) {
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


  _dragEnd: function() {
    if (this.get('disabled')) { return; }

    if ( (!this.get('dragging')) ||
         (this.get('checked') && this.get('dragAmount') < 0.5) ||
         (!this.get('checked') && this.get('dragAmount') > 0.5)) {
      this.toggleProperty('checked');
    }

    // Cleanup
    this.$('.md-thumb-container').removeAttr('style');
    this.set('dragging', false);
    this.set('dragAmount', null);
  }

});
