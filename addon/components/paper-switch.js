import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';

export default BaseFocusable.extend(RippleMixin,{
  tagName:'md-switch',
  classNames:['paper-switch','md-default-theme'],
  classNameBindings:['checked:md-checked'],
  toggle:true,

  center: true,
  rippleContainerSelector:'.md-thumb',

  checked: false,
  disabled: false,

  dragOffset: null,

  _setupSwitchDragging: function() {
    // Don't set up anything if the switch is disabled
    if (this.get('disabled')) { return; }

    // Enable dragging the switch
    this.$('.md-thumb').on('mousedown', Ember.run.bind(this, this._dragStart));

    // Allow the label of the button to remain clickable
    this.$('.md-label')
      .on('mousedown', Ember.run.bind(this, this._dragStart))
      .on('mouseup', Ember.run.bind(this, this._dragEnd));
    this.$('.md-bar')
      .on('mousedown', Ember.run.bind(this, this._dragStart))
      .on('mouseup', Ember.run.bind(this, this._dragEnd));
  }.on('didInsertElement').observes('disabled'),


  _teardownSwitchDragging: function() {
    if (!this.get('disabled')) { return; }
    this.$('.md-thumb-container').off('mousedown');
    this.$('.md-label').off('mousedown').off('mouseup');
  }.observes('disabled'),


  _dragStart: function() {
    // Set up the listeners for mouse movement and the end of the click
    Ember.$('.ember-application').on('mousemove', Ember.run.bind(this, this._drag));
    Ember.$('.ember-application').on('mouseup', Ember.run.bind(this, this._dragEnd));
  },


  /**
   * Handles moving the switch incrementally as it is dragged by the mouse.
   * Gets the left offset of the switch and the place that the cursor is during
   * the drag, and subtracts them to get the amount of pixels from the left of
   * the switch the mouse is at.  By dividing this amount by by width of the
   * switch, it can be converted into a percentage to move the switch itself by.
   */
  _drag: function(event) {
    var switchLeftOffset = this.$().offset().left;
    var eventLeft = event.clientX - switchLeftOffset;
    var switchWidth = 34;
    var offsetLeft = eventLeft / switchWidth;
    if (offsetLeft > 1) {
      offsetLeft = 1;
    } else if (offsetLeft < 0) {
      offsetLeft = 0;
    }
    offsetLeft = offsetLeft * 100;
    offsetLeft = Math.floor(offsetLeft);
    this.set('dragOffset', offsetLeft);
    this.$('.md-thumb-container').css('transform', 'translate3d(' + offsetLeft + '%, 0, 0');
    this.$('.md-thumb-container').css('-webkit-transform', 'translate3d(' + offsetLeft + '%, 0, 0');
  },


  _dragEnd: function() {
    // Toggle the value
    if (this.get('dragOffset') === null) {
      // Switch was just clicked
      this.toggleProperty('checked');
    } else if (this.get('checked') && this.get('dragOffset') < 50) {
      // Switch was checked and dragged past the halfway point
      this.set('checked', false);
    } else if (!this.get('checked') && this.get('dragOffset') > 50) {
      // Switch was not checked and dragged past the halfway point
      this.set('checked', true);
    }

    // Cleanup
    this.set('dragOffset', null);
    this.$('.md-thumb-container').removeAttr('style');
    Ember.$('.ember-application').off('mousemove');
    Ember.$('.ember-application').off('mouseup');
  }

});
