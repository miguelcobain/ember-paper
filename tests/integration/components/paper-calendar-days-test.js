import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-calendar-days', 'Integration | Component | paper calendar days', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{paper-calendar-days}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#paper-calendar-days}}
      template block text
    {{/paper-calendar-days}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
