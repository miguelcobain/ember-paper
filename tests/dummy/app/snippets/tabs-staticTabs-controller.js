import Ember from 'ember';

export default Ember.Controller.extend({
    data: {
        selectedIndex: 0,
        secondLocked: true,
        secondLabel: "Item Two",
        bottom: false
    },

    alignTabs: Ember.computed('data.bottom', function() {
        return this.get('data.bottom') ? 'bottom' : 'top';
    })
});
