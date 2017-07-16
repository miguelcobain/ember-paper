import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-tab-label', 'Integration | Component | paper tab label', {
  integration: true
});

test('it renders content in a span', function(assert) {
  this.render(hbs`
    {{#paper-tab-label}}
      label
    {{/paper-tab-label}}
  `);
  assert.equal(this.$('span').text().trim(), 'label');
});
