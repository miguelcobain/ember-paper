import Ember from 'ember';

export default Ember.Mixin.create({
    ripple: Ember.inject.service(),
    optionsForElement() {
        if (this.get('isIconButton')) {
            return {
                isMenuItem: this.get('isMenuItem'), /* We have a separate component: paper-menu-item.*/
                fitRipple: true,
                center: true
            };
        } else {
            return {
                isMenuItem: this.get('isMenuItem'),
                dimBackground: true
            };
        }
    },
    didInsertElement() {
        this.get('ripple').attach(this.$(), this.optionsForElement());
    }
});
