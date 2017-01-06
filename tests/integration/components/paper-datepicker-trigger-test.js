import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-datepicker-trigger', 'Integration | Component | paper datepicker trigger', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{paper-datepicker-trigger}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#paper-datepicker-trigger}}
      template block text
    {{/paper-datepicker-trigger}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
