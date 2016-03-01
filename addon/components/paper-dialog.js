import Ember from 'ember';
import PaperDialogContainer from './paper-dialog-container';
const {
  $,
  Component,
  String: { htmlSafe },
  computed,
  inject: { service },
  run: { scheduleOnce }
} = Ember;

/*global window*/

export default Component.extend({
  tagName: 'div',
  classNames: ['md-dialog-container'],
  constants: service(),

  attributeBindings: ['computedStyles:style'],

  parent: true,
  backdrop: true,
  clickOutsideToClose: true,

  dialogRelativeContainer: computed('parent', function() {
    if (this.get('parent')) {
      let parentContainer = this.get('parentContainer');
      if (parentContainer) {
        return parentContainer.$();
      }
    }
    return $('body');
  }),

  parentContainer: computed(function() {
    return this.nearestOfType(PaperDialogContainer);
  }),

  willDestroyElement() {
    let parentContainer = this.get('wrapperDialog');
    $('body').removeClass('md-dialog-is-showing');
    scheduleOnce('afterRender', this, function() {
      parentContainer.set('dialogIsShowing', false);
    });
  },

  computedStyles: computed('computedStyleState', function() {
    let style;
    if (this.get('computedStyleState') === 'ready') {
      let isFixed = window.getComputedStyle(document.body).position === 'fixed';
      let backdrop = this.get('backdrop') ? window.getComputedStyle($('body').find('md-backdrop')[0]) : null;
      let top = isFixed ? this.get('dialogRelativeContainer').scrollTop() / 2 : 0;
      let height = backdrop ? Math.ceil(Math.abs(parseInt(backdrop.height, 10))) : 0;
      let styles = {
        top: `${top}px`,
        height: height ? `${height}px` : '100%'
      };
      style = `top: ${styles.top}; height: ${styles.height}`;
    } else {
      style = '';
    }
    return htmlSafe(style);
  }),

  didInsertElement() {
    $('body').addClass('md-dialog-is-showing');

    // If has no parent, we move the container to body.
    if (!this.get('parent')) {
      let el = this.$().detach();
      this.get('dialogRelativeContainer').append(el);
    }

    // After render of this, we must add backdrop.
    scheduleOnce('afterRender', this, function() {
      this.set('wrapperDialog', this.nearestOfType(PaperDialogContainer));
      let wrapper = this.nearestOfType(PaperDialogContainer);
      wrapper.set('dialogIsShowing', this);
      // After parent wrapper is done, we set computedStyleState to ready in order to update the static styles.
      scheduleOnce('afterRender', this, function() {
        this.set('computedStyleState', 'ready');
      });
    });
  },

  actions: {
    onOk() {
      this.sendAction('on-ok');
    },
    onCancel() {
      this.sendAction('on-cancel');
    }
  },
  click(event) {
    if (this.get('clickOutsideToClose')) {
      // Only if clicked self. not children of this wrapper..
      if (event.target !== this.get('element')) {
        return;
      }
      this.sendAction('on-cancel');
    }
  }

});
