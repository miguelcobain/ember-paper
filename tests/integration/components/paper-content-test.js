import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-content', 'Integration | Component | paper content', {
  integration: true
});

test('renders md-content with tabindex attribute', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-content tabindex="1138"}}`);
  let $mdContent = this.$('md-content');
  let actual = $mdContent.attr('tabindex');
  let expected = '1138';
  assert.equal(actual, expected);
});
