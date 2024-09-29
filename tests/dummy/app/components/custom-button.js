/* eslint-disable ember/no-actions-hash, ember/no-classic-components, ember/require-tagless-components, prettier/prettier */
// BEGIN-SNIPPET buttons.component
// app/components/custom-button.js
import Component from '@ember/component';

export default Component.extend({
  actions: {
    targetButton() {
      alert('You pressed a target button. -from component');
    }
  }
});
// END-SNIPPET
