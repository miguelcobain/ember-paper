import ContentComponent from 'ember-basic-dropdown/components/basic-dropdown/content';
import Ember from 'ember';

const { $, run } = Ember;

export default ContentComponent.extend({
  actions: {
    didOpen() {
      let appRoot = this.get('appRoot');
      let dropdown = this.get('dropdown');
      this.dropdownElement = $(`.${this.dropdownId}`)[0];
      let triggerId = this.get('triggerId');
      if (triggerId) {
        this.triggerElement = document.getElementById(this.triggerId);
      }
      appRoot.addEventListener('mousedown', this.handleRootMouseDown, true);
      if (this.get('isTouchDevice')) {
        appRoot.addEventListener('touchstart', this.touchStartHandler, true);
        appRoot.addEventListener('touchend', this.handleRootMouseDown, true);
      }

      let onFocusIn = this.get('onFocusIn');
      if (onFocusIn) {
        this.dropdownElement.addEventListener('focusin', (e) => onFocusIn(dropdown, e));
      }
      let onFocusOut = this.get('onFocusOut');
      if (onFocusOut) {
        this.dropdownElement.addEventListener('focusout', (e) => onFocusOut(dropdown, e));
      }

      if (!this.get('renderInPlace')) {
        this.addGlobalEvents();
      }
      dropdown.actions.reposition();
      if (this.get('animationEnabled')) {
        run.scheduleOnce('afterRender', this, this.animateIn);
      }
    }
  }
});