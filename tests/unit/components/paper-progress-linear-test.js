import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('paper-progress-linear', 'Unit | Component | paper progress linear', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true,
  needs: ['service:browser-compatibility', 'service:sniffer']
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



test('it sets transform based on value', function(assert) {

  var component = this.subject({
    value: 50
  });

  this.render();

  var bar2 = this.$().find('.md-bar2')[0];

  var bar2style = bar2.style[component.get('browserCompatibility.CSS.TRANSFORM')];

  assert.equal(bar2style, 'translateX(-25%) scale(0.5, 1)', 'Transition set correctly');

});

test('it sets transform based on buffer value', function(assert) {
  var component = this.subject({
    value: 50,
    'md-buffer-value': 75

  });

  this.render();

  var bar1 = this.$().find('.md-bar1')[0];

  var bar1style = bar1.style[component.get('browserCompatibility.CSS.TRANSFORM')];

  assert.equal(bar1style, 'translateX(-12.5%) scale(0.75, 1)', 'Buffer bar transition set correctly');
});

test('it should not set transition in query mode', function(assert) {
  var component = this.subject({
    value: 80,
    'md-mode': 'query'
  });

  this.render();

  var bar2 = this.$().find('.md-bar2')[0];

  var bar2style = bar2.style[component.get('browserCompatibility.CSS.TRANSFORM')];

  assert.ok(!bar2style, 'Buffer bar not set');

});
