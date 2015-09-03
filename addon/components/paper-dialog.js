import Ember from 'ember';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';

export default Ember.Component.extend(TransitionMixin, {
  tagName: 'md-dialog',
  classNames: ['md-default-theme'],
  classNameBindings: ['overflow:md-content-overflow'],

  parent: null,
  title: '',
  content: '',
  ariaLabel: '',
  role: 'dialog',
  hasBackdrop: true,
  clickOutsideToClose: true,
  closeOnConfirm: false,

  transitionClass: 'md-transition',

  hasActions: Ember.computed('property', function() {
    return Ember.isPresent(this.get('onConfirm')) || Ember.isPresent(this.get('onCancel'));
  }),

  didInsertElement() {
    this._super(...arguments);
    this.setupElement();

    Ember.run.schedule('afterRender', () => {
      this.checkContentOverflow();
    });

    if (this.get('clickOutsideToClose')) {
      this.get('parentElement').on('click touchend', Ember.run.bind(this, 'close') );
    }
  },

  setupElement(){
    Ember.$('body').addClass('md-dialog-is-showing');
    this.$().addClass('md-transition-in');

    this.$().attr('role',this.get('role'));
    this.$().attr('tabIndex',-1);

    this.get('parentElement').append(this.$());

    if (this.get('hasBackdrop')) {
      this.get('parentElement').prepend('<md-backdrop class="md-dialog-backdrop md-opaque ng-scope md-default-theme" aria-hidden="true"></md-backdrop>');
    }

    this.$().wrap('<div class="md-dialog-container ng-scope"></div>');
  },

  checkContentOverflow(){
    var content = this.$('md-dialog-content')[0];

    if (content.scrollHeight > content.clientHeight){
      this.set('overflow',true);
    }
  },

  willDestroyElement() {
    Ember.$('body').removeClass('md-dialog-is-showing');

    this.get('parentElement').off('click touchend');
    this.$().parent().remove();
    this.get('parentElement').children('md-backdrop').remove();
  },
  close(event){
    if(this.$().find(event.target).length === 0){
      this.get('parentElement').off('click touchend');
      this.send('onCancel');
    }
  },
  parentElement: Ember.computed('parent', function() {
      return Ember.isPresent(Ember.$(this.get('parent'))) ? Ember.$(this.get('parent')) : this.$().parent();
  }),

  actions: {
    onConfirm() {
      this.sendAction('onConfirm');

      if (this.get('closeOnConfirm')) {
        this.send('onCancel');
      }
    },
    onCancel(){
      this.$().removeClass('md-transition-in');
      this.$().addClass('md-transition-out');

      this.sendAction('onCancel');
    },
  }
});
