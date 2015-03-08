import Ember from 'ember';

export default Ember.Component.extend({
  tagName:'md-select',
  classNames: ['paper-select'],
  classNameBindings: ['active', 'valid'],
  active: false,
  selectOptions: null,
  $select: null,
  $view: null,
  activeOption: null,
  promptOption: null,

  valid: Ember.computed('activeOption', function() {
    if (this.get('hasPrompt')) {
      return this.get('activeOption') !== this.get('promptOption');
    } else {
      return true;
    }
  }),

  hasPrompt: Ember.computed('prompt', function() {
    return this.get('prompt') ? true : false;
  }),

  willInsertElement: function() {
    var optionValuePath = this.get('optionValuePath');
    var content         = this.get('content');

    if (!content) {
      throw new Error("Paper Select: You must provide a content array.");
    }

    if (optionValuePath) {
      var optionValues = content.mapBy(optionValuePath.replace(/^content\.?/, '')).uniq();
      if (optionValues.length !== content.length) {
        throw new Error("Paper Select: Your optionValuePath must be unique for each item in the content array.");
      }
    } else {
      throw new Error("Paper Select: You must set an optionValuePath.");
    }
  },

  didInsertElement: function() {
    var $select = this.$().find('select');
    this.set('$select', $select);
    this.set('$view', this.$());

    /* Unpack the hidden Ember Select */
    var options = $select.find('option');
    var optionsData = [];
    for (var i = 0; i < options.length; i++) {
      var $node  = Ember.$(options[i]);

      var optionData = {
        nodeValue: $node.val(),
        nodeText:  $node.text()
      };

      optionsData.push(optionData);

      if ($node.prop('selected')) {
        this.set('activeOption', optionData);
      }
    }

    /* Remove Prompt Option from Data Set */
    if (this.get('hasPrompt')) {
      var promptOption = optionsData.objectAt(0);
      this.set('promptOption', promptOption);
      optionsData.removeObject(promptOption);
    }
    this.set('selectOptions', optionsData);

    /* Setup Out Of Bounds click listenr */
    var _this = this;
    Ember.$(document).mouseup(function(e){
      var isActive    = _this.get('active');
      var $view       = _this.get('$view');
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
    selectOption: function(option) {
      var $select = this.get('$select');
      var value   = option.nodeValue;

      $select.find('option[value="'+value+'"]').prop('selected', true);

      this.set('activeOption', option);
      $select.trigger('change');
      this.set('active', false);
    }
  }
});