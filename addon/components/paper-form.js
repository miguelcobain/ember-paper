import Ember from 'ember';
const { Component } = Ember;

export default Component.extend({
  tagName: '',
  numberOfInvalids: 0,
  isTouched: false,
  touchedTrigger: 0,
  isValid: computed('numberOfInvalids', function() {
    return this.get('numberOfInvalids') === 0;
  }),
  isInvalid: computed('isValid', function() {
    return !this.get('isValid');
  }),
  sendToParent: on('init', observer('isValid', function() {
    if (!this.get('parentAction')) {
      return;
    }
    this.get('parentAction')(this.get('isValid'));
  })),
  actions: {
    onInvalid(status) {
      if (status || status === null) {
        this.set('numberOfInvalids', this.get('numberOfInvalids') + 1);
      } else {
        if (this.get('numberOfInvalids') === 0) {
          return;
        }
        this.set('numberOfInvalids', this.get('numberOfInvalids') - 1);
      }
    },
    submit() {
      if (this.get('parentSubmit')) {
        this.get('parentSubmit')();
      }
      this.set('touchedTrigger', this.get('touchedTrigger') + 1)
    }
  }
});