import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'md-fab-action-item',

  icon: 'menu',

  //bubble actions by default
  bubbles: true,
  click() {
    if( !Ember.isEqual(this.get('disabled'), true)) {
      var target = this.get('target');

      if (target) {
        this.get('target').send(this.get('action'), this.get('param'));
      } else {
        this.sendAction('action', this.get('param'));
      }

      return this.get('bubbles');
    }
  }
});
