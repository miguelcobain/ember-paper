import Ember from 'ember';

export default Ember.Mixin.create({
    ripple: Ember.inject.service(),
    didInsertElement() {
        this.get('ripple').attach(this.$('.md-container'), {
            center: true,
            dimBackground: false,
            fitRipple: true
        });
    }
});
