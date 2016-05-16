// BEGIN-SNIPPET buttons.component
// app/components/custom-button.js
import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    targetButton() {
      alert('You pressed a target button. -from component');
    }
  }
});
// END-SNIPPET
