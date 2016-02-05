import Ember from 'ember';
const { computed } = Ember;

export default Ember.Controller.extend({
  someLongList: computed(function () {
    var list = [];
    for (let i = 0; i < 50; i++) {
      list.push(`item ${i}`);
    }
    return list;
  })

});
