import Component from '@ember/component';

export default Component.extend({
  tagName: 'md-fab-trigger',

  click() {
    this.speedDial.toggle();
  },

  focusOut() {
    this.speedDial.close();
  }
});
