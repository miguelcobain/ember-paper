import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-pagination-wrapper', 'Integration | Component | paper pagination wrapper', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{paper-pagination-wrapper}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#paper-pagination-wrapper}}
      template block text
    {{/paper-pagination-wrapper}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
