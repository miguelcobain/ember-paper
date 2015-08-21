import Ember from 'ember';
import PaperMenuAbstract from './paper-menu-abstract';


/**
 * The paper-menu-container-abstract is responsible for animation and positioning the menu / select /  any other
 * menu based component.
 *
 * @abstract
 */
export default Ember.Component.extend({
  animate: Ember.inject.service(),
  constants: Ember.inject.service(),

  classNames: ['md-default-theme'],
  classNameBindings: ['interaction:md-clickable'],

  menuAbstract: Ember.computed(function() {
    var container = this.nearestOfType(PaperMenuAbstract);
    return container;
  }),

  _resizeHandler: Ember.computed(function() {
    var _self = this;
    return  function () {
      _self.get('menuAbstract').registerWrapper(_self);
    };
  }),


  moveComponentToBody: Ember.on('didInsertElement', function() {
    var _self = this;
    var dom = this.$().detach();
    Ember.$('body').append(dom);

    var menuAbstract = this.get('menuAbstract');

    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        menuAbstract.registerWrapper(_self);
        window.requestAnimationFrame(function () {
          _self.$().addClass('md-active');
          _self.set('alreadyOpen', true);
          _self.$()[0].style[_self.get('constants').get('CSS').TRANSFORM] = '';
        });
      });
    });

    this.get('animate')
      .waitTransitionEnd(this.$(), {timeout: 370})
      .then(function (/*response*/) {

      });

    // Register resize handler.
    Ember.$(window).on('resize',this.get('_resizeHandler'));

  }),

  willDestroyElement() {
    // Destroy resize handler.
    Ember.$(window).off('resize',this.get('_resizeHandler'));
  },

  hideWrapper() {
    var _self = this;
    return new Ember.RSVP.Promise(function (resolve/*, reject*/) {
      _self.get('animate').waitTransitionEnd(_self.$(), { timeout: 370 }).then(resolve);
      _self.$().removeClass('md-active').addClass('md-leave');
    });
  },

  actions: {
    toggleMenu() {
      this.get('menuAbstract').send('toggleMenu');
    }
  }
});
