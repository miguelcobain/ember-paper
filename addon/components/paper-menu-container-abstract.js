/**
 * @module ember-paper
 */
import Ember from 'ember';
import PaperMenuAbstract from './paper-menu-abstract';

const { Component, computed, inject, on, $, RSVP } = Ember;

/**
 * The paper-menu-container-abstract is responsible for animation and
 * positioning the menu or select or any other menu based component.
 *
 * @class PaperMenuContainerAbstract
 * @extends Ember.Component
 */
export default Component.extend({
  transitionEvents: inject.service(),
  constants: inject.service(),

  classNames: ['md-default-theme'],
  classNameBindings: ['interaction:md-clickable'],

  menuAbstract: computed(function() {
    let container = this.nearestOfType(PaperMenuAbstract);
    return container;
  }),

  _resizeHandler: computed(function() {
    return () => {
      this.get('menuAbstract').registerWrapper(this);
    };
  }),

  moveComponentToBody: on('didInsertElement', function() {
    let _self = this;
    let dom = this.$().detach();
    $('body').append(dom);

    let menuAbstract = this.get('menuAbstract');

    window.requestAnimationFrame(function() {
      window.requestAnimationFrame(function() {
        menuAbstract.registerWrapper(_self);
        window.requestAnimationFrame(function() {
          _self.$().addClass('md-active');
          _self.set('alreadyOpen', true);
          _self.$()[0].style[_self.get('constants').get('CSS').TRANSFORM] = '';
        });
      });
    });

    // Register resize handler.
    $(window).on('resize', this.get('_resizeHandler'));

  }),

  willDestroyElement() {
    // Destroy resize handler.
    $(window).off('resize', this.get('_resizeHandler'));
  },

  hideWrapper() {
    let _self = this;
    return new RSVP.Promise(function(resolve/*, reject*/) {
      _self.get('transitionEvents').addEndEventListener(_self.get('element'), function() {
        _self.$().removeClass('md-active');
        resolve();
      });
      _self.$().addClass('md-leave');
    });
  },

  actions: {
    toggleMenu() {
      this.get('menuAbstract').send('toggleMenu');
    }
  }
});
