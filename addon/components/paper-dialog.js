import Ember from 'ember';
import PaperDialogContainer from './paper-dialog-container';

/*global window*/

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['md-dialog-container'],

  attributeBindings: ['computedStyles:style'],

  parent: true,

  dialogRelativeContainer: Ember.computed('parent',function () {
    var parentContainer = this.get('parentContainer');
    if (this.get('parent')) {
      if (parentContainer) {
        return parentContainer.$();
      }
    }
    return Ember.$('body');
  }),

  parentContainer: Ember.computed(function () {
    return this.nearestOfType(PaperDialogContainer);
  }),

  willDestroyElement() {
    var parentContainer = this.get('wrapperDialog');
    Ember.$('body').removeClass('md-dialog-is-showing');
    Ember.run.scheduleOnce('afterRender', this, function() {
      parentContainer.set('dialogIsShowing', false);
    });
  },

  computedStyles: Ember.computed('computedStyleState',function() {
    var style;
    if (this.get('computedStyleState') === 'ready') {
      var isFixed = window.getComputedStyle(document.body).position === 'fixed';
      var backdrop = window.getComputedStyle(Ember.$('body').find('md-backdrop')[0]);
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


    Ember.run.scheduleOnce('afterRender', this, function() {
      this.set('wrapperDialog', this.nearestOfType(PaperDialogContainer));
      var wrapper = this.nearestOfType(PaperDialogContainer);
      wrapper.set('dialogIsShowing', this);
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
