import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('paper-virtual-repeat', 'Integration | Component | paper virtual repeat', {
  integration: true
});

// Will be able to use this if/when PhantomJS supports 3D transfroms
// function getTransform(target) {
//   return target[0].style.webkitTransform || target.css('transform');
// }

const NUM_EXTRA = 3;

test('should render only enough items to fill the viewport + 3 (vertical)', function(assert) {
  assert.expect(1);
  let items = [];
  for (let i = 0; i < 1000; i++) {
    items.push(i);
  }
  this.set('items', items);
  this.render(hbs`<div style="height: 300px;">
    {{#paper-virtual-repeat class="vertical-demo" items=items as |visibleItems|}}
      {{#each visibleItems as |item|}}
        <div style="height:30px;">{{item}}</div>
      {{/each}}
    {{/paper-virtual-repeat}}
    </div>`);
  assert.equal(this.$('.md-virtual-repeat-offsetter').children().length, 10 + NUM_EXTRA);

});

test('should render only enough items to fill the viewport + 3 (horizontal)', function(assert) {
  assert.expect(1);
  let items = [];
  for (let i = 0; i < 1000; i++) {
    items.push(i);
  }
  this.set('items', items);
  this.render(hbs`<div style="width: 300px;">
    {{#paper-virtual-repeat horizontal=true items=items as |visibleItems|}}
      {{#each visibleItems as |item|}}
        <div style="width:30px;">{{item}}</div>
      {{/each}}
    {{/paper-virtual-repeat}}
    </div>`);
  assert.equal(this.$('.md-virtual-repeat-offsetter').children().length, 10 + NUM_EXTRA);
});

test('should reposition items when scrolled so that there is still only enough items to fit + 3', function(assert) {
  assert.expect(3);
  let items = [];
  for (let i = 0; i < 1000; i++) {
    items.push(i);
  }
  this.set('items', items);
  this.render(hbs`<div style="height: 300px;">
    {{#paper-virtual-repeat class="vertical-demo" items=items as |visibleItems|}}
      {{#each visibleItems as |item|}}
        <div style="height:30px;">{{item}}</div>
      {{/each}}
    {{/paper-virtual-repeat}}
    </div>`);

  assert.equal(this.$('.md-virtual-repeat-offsetter').attr('style'), 'transform: translateY(0px);');
  this.$('.md-virtual-repeat-scroller').scrollTop(30);
  return wait().then(() => {
    assert.equal(this.$('.md-virtual-repeat-offsetter').children().length, 10 + NUM_EXTRA);
    assert.equal(this.$('.md-virtual-repeat-offsetter').attr('style'), 'transform: translateY(30px);');
  });
});

test('should call onScrollBottomed action when scrolled to the bottom', function(assert) {
  assert.expect(1);
  let items = [];
  for (let i = 0; i < 1000; i++) {
    items.push(i);
  }
  this.set('items', items);
  this.scrolled = () => {
    assert.ok(true, 'action called');
  };
  this.render(hbs`<div style="height: 300px;">
    {{#paper-virtual-repeat class="vertical-demo" items=items onScrollBottomed=scrolled as |visibleItems|}}
      {{#each visibleItems as |item|}}
        <div style="height:30px;">{{item}}</div>
      {{/each}}
    {{/paper-virtual-repeat}}
    </div>`);
  this.$('.md-virtual-repeat-scroller')[0].scrollTop = 2970;
  return wait();
});