import Ember from 'ember';
const { Service, Evented } = Ember;

export default Service.extend(Evented, {
  toggle(target){
    this.trigger('toggle', target);
  }
});
