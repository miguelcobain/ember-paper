import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-fab-speed-dial', 'Integration | Component | paper fab speed dial', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{paper-fab-speed-dial}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#paper-fab-speed-dial}}
      template block text
    {{/paper-fab-speed-dial}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
