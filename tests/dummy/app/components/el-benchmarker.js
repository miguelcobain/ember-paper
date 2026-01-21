import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  label: 'Render time',
  /* eslint-disable */
  willRender() {
    console.time(this.get('label'));
  },
  didRender() {
    console.timeEnd(this.get('label'));
  }
  /* eslint-enable */
});
