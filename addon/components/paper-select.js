import Ember from 'ember';

export default Ember.Component.extend({
  tagName:'md-select',
  classNames: ['paper-select'],
  classNameBindings: ['active', 'selection:valid'],
  active: false,
  prompt: null,
  content: null,
  optionValuePath: null,
  optionLabelPath: null,
  selection: null,

  displayString: Ember.computed('selection', function() {
    var promptString = this.get('prompt') || "Select an option";
    var selection    = this.get('selection');
    if (!selection) { return promptString; }

    var optionLabelPath = this.get('optionLabelPath');
    var selectionString;
    if (optionLabelPath) {
      var relativeOptionLabelPath = optionLabelPath.replace(/^content\.?/, '');
      selectionString             = this.get('selection.'+relativeOptionLabelPath);
    } else {
      selectionString = selection.toString();
    }
    return selectionString;
  }),

  /* Use willInsertElement to validate & setup input data */
  willInsertElement: function() {
    var content         = this.get('content');
    var selection       = this.get('selection');

    if (!content) {
      throw new Error("Paper Select: You must provide a content array.");
    }

    if (selection && !content.contains(selection)) {
      throw new Error("Paper Select: Your selection value is not present in your content array.");
    }
  },

  /* Setup Out Of Bounds click listener */
  didInsertElement: function() {
    var $view = this.$();
    var _this = this;
    Ember.$(document).mouseup(function(e){
      var isActive    = _this.get('active');
      var outOfBounds = !$view.is(e.target) && $view.has(e.target).length === 0;

      if (isActive && outOfBounds) {
        _this.set('active', false);
      }
    });
  },

  actions: {
    toggleActiveState: function() {
      this.toggleProperty('active');
    },
    selectItem: function(item) {
      this.set('selection', item);
      this.set('active', false);
    }
  }
});