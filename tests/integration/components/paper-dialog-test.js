import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-dialog', 'Integration | Component | paper dialog', {
  integration: true
});

test('should render empty dialog when blockless', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{paper-dialog}}
  `);
  assert.ok(1);
});

test('should yield content as a block component', function(assert) {

  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{#paper-dialog}}
      Lorem ipsum.
    {{/paper-dialog}}
  `);
  assert.ok(1);
});
