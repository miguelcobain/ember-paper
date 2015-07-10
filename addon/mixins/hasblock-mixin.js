import Ember from 'ember';

/**
 * This mixin add support for hasBlock for Ember < 1.13.0
 *
 * @todo Remove in Ember 2.0
 * See also https://github.com/emberjs/ember.js/pull/11313
 */
export default Ember.Mixin.create({
  hasBlock: Ember.computed(function () {
    return !!this.get("template");
  })
});
