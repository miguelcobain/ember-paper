import Ember from 'ember';

export default Ember.Mixin.create({
    ripple: Ember.inject.service(),
    rippleContainerSelector: '.md-container',
    didInsertElement() {
        this.get('ripple').attach(this.$(this.get('rippleContainerSelector')), {
            center: true,
            dimBackground: false,
            fitRipple: true
        });
    }
});
