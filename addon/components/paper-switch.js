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
  switchWidth: null,

  _setupSwitchDragging: function() {
    // Don't set up anything if the switch is disabled
    if (this.get('disabled')) { return; }

    this.set('switchWidth', this.$('.md-bar').width());

    // Enable dragging the switch
    var thumbElement = this.get('element').getElementsByClassName('md-thumb-container')[0];
    var thumbElementHammer= new Hammer(thumbElement);
    thumbElementHammer.get('pan').set({ pointers: 0, threshold: 1 });
    thumbElementHammer.on('panleft', Ember.run.bind(this, this._drag));
    thumbElementHammer.on('panright', Ember.run.bind(this, this._drag));
    thumbElementHammer.on('panend', Ember.run.bind(this, this._dragEnd));

    // Allow the label of the button to remain clickable
    var switchHammer = new Hammer(this.get('element'));
    switchHammer.on('tap', Ember.run.bind(this, this._dragEnd));
  }.on('didInsertElement').observes('disabled'),


  /**
   * Handles moving the switch incrementally as it is dragged by the mouse.
   * Gets the left offset of the switch and the place that the cursor is during
   * the drag, and subtracts them to get the amount of pixels from the left of
   * the switch the mouse is at.  By dividing this amount by by width of the
   * switch, it can be converted into a percentage to move the switch itself by.
   */
  _drag: function(event) {
    if (this.get('disabled')) { return; }

    var percent = event.deltaX / this.get('switchWidth');
    var translate = Math.max(0, Math.min(1, percent));
    this.set('dragOffset', translate);
    var transformProp = 'translate3d(' + (100 * translate) + '%, 0, 0)';
    this.$('.md-thumb-container').css('transform', transformProp);
    this.$('.md-thumb-container').css('-webkit-transform', transformProp);
  },


  _dragEnd: function() {
    if (this.get('disabled')) { return; }

    if (this.get('dragOffset') === null) {
      // Switch was just clicked
      this.toggleProperty('checked');
    } else if (this.get('checked') && this.get('dragOffset') < 0.5) {
      // Switch was checked and dragged past the halfway point
      this.set('checked', false);
    } else if (!this.get('checked') && this.get('dragOffset') > 0.5) {
      // Switch was not checked and dragged past the halfway point
      this.set('checked', true);
    }

    // Cleanup
    this.set('dragOffset', null);
    this.$('.md-thumb-container').removeAttr('style');
  }

});
