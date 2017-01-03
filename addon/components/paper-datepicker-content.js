import ContentComponent from 'ember-basic-dropdown/components/basic-dropdown/content';
import { nextTick } from 'ember-css-transitions/mixins/transition-mixin';

export default ContentComponent.extend({
  animateIn() {
    // Add CSS class after one frame to trigger open animation.
    nextTick().then(() => {
      let calendarPane = document.getElementById(this.dropdownId);
      calendarPane.classList.add('md-pane-open');
    });
  }
});
