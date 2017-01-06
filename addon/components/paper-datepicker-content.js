import ContentComponent from 'ember-basic-dropdown/components/basic-dropdown/content';
import { nextTick } from 'ember-css-transitions/mixins/transition-mixin';
import layout from '../templates/components/paper-datepicker-content';

export default ContentComponent.extend({
  layout,

  animateIn() {
    // Add CSS class after one frame to trigger open animation.
    nextTick().then(() => {
      let calendarPane = document.getElementById(this.dropdownId);
      calendarPane.classList.add('md-pane-open');
    });
  }
});
