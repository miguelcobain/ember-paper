import Ember from 'ember';
import PaperDialogContainer from './paper-dialog-container';

/*global window*/

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['md-dialog-container'],

  attributeBindings: ['computedStyles:style'],

  backdrop: false,
  parent: true,

  dialogRelativeContainer: Ember.computed('parent',function () {
    if (this.get('parent')) {
      var parentContainer = this.nearestOfType(PaperDialogContainer);
      if (parentContainer) {
        return parentContainer.$();
      }
    }
    return Ember.$('body');
  }),

  willDestroyElement() {
    Ember.$('body').removeClass('md-dialog-is-showing');
  },

  computedStyles: Ember.computed('computedStyleState',function() {
    var style;
    if (this.get('computedStyleState') === 'ready') {
      var isFixed = window.getComputedStyle(document.body).position === 'fixed';
      var backdrop = this.get('backdrop') ? window.getComputedStyle(this.$().find('md-backdrop')[0]) : null;
      var height = backdrop ? Math.ceil(Math.abs(parseInt(backdrop.height, 10))) : 0;
      var styles = {
        top: (isFixed ? this.get('dialogRelativeContainer').scrollTop() / 2 : 0) + 'px',
        height: height ? height + 'px' : '100%'
      };
      style = `top: ${styles.top}; height: ${styles.height}`;
    } else {
      style = '';
    }
    return new Ember.Handlebars.SafeString(style);
  }),

  didInsertElement() {
    Ember.$('body').addClass('md-dialog-is-showing');


    var el = this.$().detach();
    this.get('dialogRelativeContainer').append(el);

    Ember.run.scheduleOnce('afterRender', this, function() {
      this.set('computedStyleState', 'ready');
    });
  },

  actions: {
    onOk () {
      this.sendAction('on-ok');
    },
    onCancel () {
      this.sendAction('on-cancel');
    }
  }

});
