import Ember from 'ember';

export default Ember.Component.extend({
	tagName: '',
	attributeBindings: ['style'],
	style: "width:100%",
	customValidations: [],
	hasValidation: Ember.computed('min', 'max', 'errorMessages', 'maxlength', 'required', 'customValidations', function() {
		return this.get('min') || this.get('max') || this.get('errorMessages') || this.get('maxlength') || this.get('required') || this.get('customValidations');
	}),
	didUpdateAttrs: function(params) {
		if (params.oldAttrs.isTouched === params.newAttrs.isTouched) return;
		this.set('touched', this.get('isTouched'));
	},
	actions: {
		callOnInvalid: function(status) {
			this.get('onInvalid')(status);
		}
	}
});
