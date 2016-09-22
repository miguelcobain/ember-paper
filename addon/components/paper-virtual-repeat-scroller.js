import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['md-virtual-repeat-scroller'],
  didInsertElement() {
    this.$().scroll((e) => {
      this.get('onScroll')(e);
    });
  },
  willDestroyElement() {
    this.$().off('scroll');
  }
});
