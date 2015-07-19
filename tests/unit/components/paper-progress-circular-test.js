import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('paper-progress-circular', 'Unit | Component | paper progress circular', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true,
  needs: ['service:constants', 'service:sniffer']
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});



test('it sets transform scale 1 by default', function(assert) {

  var component = this.subject({
    value: 50
  });

  this.render();

  var spinnerWrapper = this.$().find('.md-spinner-wrapper')[0];

  var spinnerWrapperStyle = spinnerWrapper.style[component.get('constants.CSS.TRANSFORM')];

  assert.equal(spinnerWrapperStyle, 'scale(1)', 'Transform set correctly');

});

test('it sets transform scale 2 when diameter is 96', function(assert) {

  var component = this.subject({
    value: 50,
    diameter: 96
  });

  this.render();

  var spinnerWrapper = this.$().find('.md-spinner-wrapper')[0];

  var spinnerWrapperStyle = spinnerWrapper.style[component.get('constants.CSS.TRANSFORM')];

  assert.equal(spinnerWrapperStyle, 'scale(2)', 'Transform set correctly');

});
