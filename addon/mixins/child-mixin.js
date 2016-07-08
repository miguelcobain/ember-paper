import Ember from 'ember';
const { Mixin } = Ember;

export default Mixin.create({
  asdfgh: 'lel',
  init() {
    this._super(...arguments);
    if (this.get('parentComponent')) {
      this.get('parentComponent').register(this);
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.get('parentComponent')) {
      this.get('parentComponent').unregister(this);
    }
  }
});