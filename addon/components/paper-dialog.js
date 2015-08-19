import Ember from 'ember';

/*global window*/

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['md-dialog-container'],

  attributeBindings: ['computedStyles:style'],

  backdrop: false,

  willDestroyElement() {

  },

  computedStyles: Ember.computed('computedStyleState',function() {
    var style;
    if (this.get('computedStyleState') === 'ready') {
      var isFixed = window.getComputedStyle(document.body).position === 'fixed';
      var backdrop = this.get('backdrop') ? window.getComputedStyle(this.$().find('md-backdrop')[0]) : null;
      var height = backdrop ? Math.ceil(Math.abs(parseInt(backdrop.height, 10))) : 0;
      var styles = {
        top: (isFixed ? this.$().parent().scrollTop() / 2 : 0) + 'px',
        height: height ? height + 'px' : '100%'
      };
      style = `top: ${styles.top}; height: ${styles.height}`;
    } else {
      style = '';
    }
    return new Ember.Handlebars.SafeString(style);
  }),

  didInsertElement() {
    var el = this.$().detach();
    Ember.$('body').append(el);

    Ember.run.scheduleOnce('afterRender', this, function() {
      this.set('computedStyleState', 'ready');
    });
  }

});
