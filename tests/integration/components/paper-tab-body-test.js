import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-tab-body', 'Integration | Component | paper tab body', {
  integration: true,
  beforeEach() {
    this.set('parentComponent', {
      trigger() {}
    });
  }
});

test('it renders content in wormhole of parentComponent', function(assert) {
  this.set('parentComponent.wormhole', 'wormhole');

  this.render(hbs`
    <div id="wormhole"></div>
    {{#paper-tab-body parentComponent=parentComponent}}
      body
    {{/paper-tab-body}}
  `);

  assert.equal(this.$('#wormhole > md-tab-content').text().trim(), 'body');
});
