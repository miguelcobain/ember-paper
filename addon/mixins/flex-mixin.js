import Ember from 'ember';

/**
 * Adds bindings to flex attributes
 * - flex=true|false
 * - flex-layout=column|row
 */
export default Ember.Mixin.create({
  attributeBindings:['flexAttr:flex', 'flex-layout:layout'],
  /*
   * Not binding boolean values in Ember 1.8.1?
   * https://github.com/emberjs/ember.js/issues/9595
   */
  flexAttr: Ember.computed('flex', function() {
    return this.get('flex') ? 'flex' : null;
  })
});
