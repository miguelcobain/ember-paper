import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['md-dialog-container'],

  click() {
    this.sendAction('outsideClicked');
  }

});
