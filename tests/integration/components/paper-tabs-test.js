import run from 'ember-runloop';
import { A } from 'ember-array/utils';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let originalMatchMedia;

moduleForComponent('paper-tabs', 'Integration | Component | paper tabs', {
  integration: true,
  beforeEach() {
    originalMatchMedia = window.matchMedia;
  },
  afterEach() {
    window.matchMedia = originalMatchMedia;
  }
});

test('it renders all tabs', function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab label="FIRST"}}First content{{/tabs.tab}}
      {{#tabs.tab label="SECOND"}}Second content{{/tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.equal(this.$('md-tab-item:nth(0)').text().trim(), 'FIRST');
  assert.equal(this.$('md-tab-item:nth(1)').text().trim(), 'SECOND');
  assert.equal(this.$('md-tab-content:nth(0)').text().trim(), 'First content');
  assert.equal(this.$('md-tab-content:nth(1)').text().trim(), 'Second content');
});

test('it renders md-dynamic-height class', function(assert) {
  this.set('dynamicHeight', false);

  this.render(hbs`
    {{#paper-tabs dynamicHeight=dynamicHeight as |tabs|}}
      {{#tabs.tab label="a"}}a{{/tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.notOk(this.$('md-tabs').hasClass('md-dynamic-height'), 'No md-dynamic-height class');

  this.set('dynamicHeight', true);

  assert.ok(this.$('md-tabs').hasClass('md-dynamic-height'), 'md-dynamic-height class');
});

test('it renders md-border-bottom attribute', function(assert) {
  this.set('borderBottom', false);

  this.render(hbs`
    {{#paper-tabs borderBottom=borderBottom as |tabs|}}
      {{#tabs.tab label="a"}}a{{/tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.notOk(this.$('md-tabs').attr('md-border-bottom'), 'No md-border-bottom attr');

  this.set('borderBottom', true);

  assert.ok(this.$('md-tabs').attr('md-border-bottom'), 'md-border-bottom attr');
});

test('it renders md-align-tabs attribute', function(assert) {
  this.set('alignTabs', 'top');

  this.render(hbs`
    {{#paper-tabs alignTabs=alignTabs as |tabs|}}
      {{#tabs.tab label="a"}}a{{/tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.equal(this.$('md-tabs').attr('md-align-tabs'), 'top');

  this.set('alignTabs', 'bottom');

  assert.equal(this.$('md-tabs').attr('md-align-tabs'), 'bottom');
});

test('it select the first available tab by default', function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab disabled=true label="FIRST"}}First content{{/tabs.tab}}
      {{#tabs.tab label="SECOND"}}Second content{{/tabs.tab}}
      {{#tabs.tab label="THIRD"}}Third content{{/tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.ok(this.$('md-tab-item:nth(1)').hasClass('md-active'));
});

test('it can switch between tabs', function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab disabled=true label="FIRST"}}First content{{/tabs.tab}}
      {{#tabs.tab label="SECOND"}}Second content{{/tabs.tab}}
      {{#tabs.tab label="THIRD"}}Third content{{/tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.ok(this.$('md-tab-item:nth(1)').hasClass('md-active'));

  assert.equal(this.$('md-tab-content.md-active').text().trim(), 'Second content');

  this.$('md-tab-item:nth(2)').click();

  assert.notOk(this.$('md-tab-item:nth(1)').hasClass('md-active'));
  assert.ok(this.$('md-tab-item:nth(2)').hasClass('md-active'));

  assert.equal(this.$('md-tab-content.md-active').text().trim(), 'Third content');
});

test('it handles tabs with dynamic height', function(assert) {
  this.render(hbs`
    {{#paper-tabs dynamicHeight=true as |tabs|}}
      {{#tabs.tab label="FIRST"}}First content{{/tabs.tab}}
      {{#tabs.tab label="SECOND"}}
        This<br />
        is<br />
        a<br />
        multiline<br />
        content
      {{/tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.equal(this.$('md-tabs').attr('style'), 'transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1); height: 70px');

  this.$('md-tab-item:nth(1)').click();

  assert.equal(this.$('md-tabs').attr('style'), 'transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1); height: 158px');
});

test('it should stretches tabs in mobile if stretchTabs=auto unless shouldPaginate is true', function(assert) {
  assert.expect(3);

  window.matchMedia = function(query) {
    assert.equal(query, '(max-width: 599px)');
    return { matches: true };
  };

  this.set('stretchTabs', 'auto');

  this.render(hbs`
    {{#paper-tabs stretchTabs=stretchTabs shouldPaginate=shouldPaginate as |tabs|}}
      {{#tabs.tab label="a"}}a{{/tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.ok(this.$('md-tabs-wrapper').hasClass('md-stretch-tabs'), 'md-stretch-tabs class');

  this.set('shouldPaginate', true);

  assert.notOk(this.$('md-tabs-wrapper').hasClass('md-stretch-tabs'), 'no md-stretch-tabs class');
});

test('it opens nearest available tab if selected tab is disabled', function(assert) {
  this.set('tabDisabled', false);

  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab label="FIRST" disabled=tabDisabled}}First content{{/tabs.tab}}
      {{#tabs.tab label="SECOND"}}Second content{{/tabs.tab}}
      {{#tabs.tab label="THIRD" disabled=true}}Third content{{/tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.ok(this.$('md-tab-item:nth(0)').hasClass('md-active'));
  assert.equal(this.$('md-tab-content.md-active').text().trim(), 'First content');

  this.set('tabDisabled', true);

  assert.ok(this.$('md-tab-item:nth(1)').hasClass('md-active'));
  assert.equal(this.$('md-tab-content.md-active').text().trim(), 'Second content');
});

test('it does not show pagination if it has enough space', function(assert) {
  this.render(hbs`
    <div style="width:1500px;">
      {{#paper-tabs as |tabs|}}
        {{#tabs.tab label="FIRST"}}First content{{/tabs.tab}}
        {{#tabs.tab label="SECOND"}}Second content{{/tabs.tab}}
        {{#tabs.tab label="THIRD"}}Third content{{/tabs.tab}}
        {{#tabs.tab label="FOURTH"}}Fourth content{{/tabs.tab}}
        {{#tabs.tab label="FIFTH"}}Fifth content{{/tabs.tab}}
        {{#tabs.tab label="SIXTH"}}Sixth content{{/tabs.tab}}
        {{#tabs.tab label="SEVENTH"}}Seventh content{{/tabs.tab}}
      {{/paper-tabs}}
    </div>
  `);

  assert.ok(this.$('md-prev-button').length === 0, 'Prev button is hidden');
  assert.ok(this.$('md-next-button').length === 0, 'Next button is hidden');
});

/* FIXME can't seems to make it work on phantomJS
test('it can paginate tabs', function(assert) {
  this.render(hbs`
    <div style="width:400px;">
      {{#paper-tabs as |tabs|}}
        {{#tabs.tab label="FIRST"}}First content{{/tabs.tab}}
        {{#tabs.tab label="SECOND"}}Second content{{/tabs.tab}}
        {{#tabs.tab label="THIRD"}}Third content{{/tabs.tab}}
        {{#tabs.tab label="FOURTH"}}Fourth content{{/tabs.tab}}
        {{#tabs.tab label="FIFTH"}}Fifth content{{/tabs.tab}}
        {{#tabs.tab label="SIXTH"}}Sixth content{{/tabs.tab}}
        {{#tabs.tab label="SEVENTH"}}Seventh content{{/tabs.tab}}
      {{/paper-tabs}}
    </div>
  `);

  assert.ok(this.$('md-prev-button').length === 1, 'Prev button is visible');
  assert.ok(this.$('md-next-button').length === 1, 'Next button is visible');

  assert.ok(this.$('md-prev-button').hasClass('md-disabled'), 'Prev button is disabled');
  assert.notOk(this.$('md-next-button').hasClass('md-disabled'), 'Next button is enabled');

  assert.equal(this.$('md-pagination-wrapper').attr('style'), 'transform: translate3d(-0px, 0px, 0px);', 'Translation to 0');

  this.$('md-next-button').click();

  assert.equal(this.$('md-pagination-wrapper').attr('style'), 'transform: translate3d(-127px, 0px, 0px);', 'Pagination translated (1)');

  assert.notOk(this.$('md-prev-button').hasClass('md-disabled'), 'Prev button is enabled');
  assert.notOk(this.$('md-next-button').hasClass('md-disabled'), 'Next button is enabled');

  this.$('md-next-button').click();

  assert.equal(this.$('md-pagination-wrapper').attr('style'), 'transform: translate3d(-215px, 0px, 0px);', 'Pagination translated (2)');

  assert.notOk(this.$('md-prev-button').hasClass('md-disabled'), 'Prev button is enabled');
  assert.notOk(this.$('md-next-button').hasClass('md-disabled'), 'Next button is enabled');

  this.$('md-tab-item:nth(6)').click();

  assert.equal(this.$('md-pagination-wrapper').attr('style'), 'transform: translate3d(-324px, 0px, 0px);', 'Pagination translated (3)');

  assert.ok(this.$('md-next-button').hasClass('md-disabled'), 'Next button is disabled');
});
*/

test('it can center tabs', function(assert) {
  this.render(hbs`
    <div style="width:1500px;">
      {{#paper-tabs centerTabs=true as |tabs|}}
        {{#tabs.tab label="FIRST"}}First content{{/tabs.tab}}
        {{#tabs.tab label="SECOND"}}Second content{{/tabs.tab}}
        {{#tabs.tab label="THIRD"}}Third content{{/tabs.tab}}
        {{#tabs.tab label="FOURTH"}}Fourth content{{/tabs.tab}}
        {{#tabs.tab label="FIFTH"}}Fifth content{{/tabs.tab}}
        {{#tabs.tab label="SIXTH"}}Sixth content{{/tabs.tab}}
        {{#tabs.tab label="SEVENTH"}}Seventh content{{/tabs.tab}}
      {{/paper-tabs}}
    </div>
  `);

  assert.ok(this.$('md-pagination-wrapper').hasClass('md-center-tabs'), 'has md-center-tabs class');
  assert.equal(this.$('md-pagination-wrapper').attr('style'), undefined, 'Translation disabled');
});

test('it does not center tabs if pagination has pagination', function(assert) {
  this.render(hbs`
    <div style="width:400px;">
      {{#paper-tabs centerTabs=true as |tabs|}}
        {{#tabs.tab label="FIRST"}}First content{{/tabs.tab}}
        {{#tabs.tab label="SECOND"}}Second content{{/tabs.tab}}
        {{#tabs.tab label="THIRD"}}Third content{{/tabs.tab}}
        {{#tabs.tab label="FOURTH"}}Fourth content{{/tabs.tab}}
        {{#tabs.tab label="FIFTH"}}Fifth content{{/tabs.tab}}
        {{#tabs.tab label="SIXTH"}}Sixth content{{/tabs.tab}}
        {{#tabs.tab label="SEVENTH"}}Seventh content{{/tabs.tab}}
      {{/paper-tabs}}
    </div>
  `);

  assert.notOk(this.$('md-pagination-wrapper').hasClass('md-center-tabs'), 'no md-center-tabs class');
  assert.equal(this.$('md-pagination-wrapper').attr('style'), 'transform: translate3d(-0px, 0px, 0px);', 'Translation enabled');
});

test('it binds to selected', function(assert) {
  this.set('selected', 1);

  this.render(hbs`
    {{#paper-tabs selected=selected as |tabs|}}
      {{#tabs.tab label="FIRST"}}First content{{/tabs.tab}}
      {{#tabs.tab label="SECOND"}}Second content{{/tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.notOk(this.$('md-tab-item:nth(0)').hasClass('md-active'), 'first tab is inactive');
  assert.ok(this.$('md-tab-item:nth(1)').hasClass('md-active'), 'second tab is active');

  this.set('selected', 0);

  assert.ok(this.$('md-tab-item:nth(0)').hasClass('md-active'), 'first tab is inactive');
  assert.notOk(this.$('md-tab-item:nth(1)').hasClass('md-active'), 'second tab is active');
});

test('it allow cases where no tabs are selected', function(assert) {
  this.render(hbs`
      {{#paper-tabs as |tabs|}}
        {{#tabs.tab disabled=true label="FIRST"}}First content{{/tabs.tab}}
        {{#tabs.tab disabled=true label="SECOND"}}Second content{{/tabs.tab}}
      {{/paper-tabs}}
 `);

  assert.notOk(this.$('md-tab-item:nth(0)').hasClass('md-active'), 'first tab is inactive');
  assert.notOk(this.$('md-tab-item:nth(1)').hasClass('md-active'), 'second tab is inactive');

  assert.ok(this.$('md-tab-content.md-active').length === 0, 'no active content');
});

test('it can stretch tabs', function(assert) {
  this.set('stretchTabs', 'never');

  this.render(hbs`
    {{#paper-tabs stretchTabs=stretchTabs as |tabs|}}
      {{#tabs.tab label="FIRST"}}First content{{/tabs.tab}}
      {{#tabs.tab label="SECOND"}}Second content{{/tabs.tab}}
      {{#tabs.tab label="THIRD"}}Third content{{/tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.notOk(this.$('md-tabs-wrapper').hasClass('md-stretch-tabs'), 'No md-stretch-tabs class');

  this.set('stretchTabs', 'always');

  assert.ok(this.$('md-tabs-wrapper').hasClass('md-stretch-tabs'), 'md-stretch-tabs class');
});

/* FIXME cant't seem to have pixel perfect tests working across chrome/phantomJS
test('it renders ink bar properly', function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab label="FIRST"}}First content{{/tabs.tab}}
      {{#tabs.tab label="SECOND"}}Second content{{/tabs.tab}}
      {{#tabs.tab label="THIRD"}}Third content{{/tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.equal(this.$('md-ink-bar').attr('style'), 'left:0px;right:191px;');

  this.$('md-tab-item:nth(2)').click();

  assert.equal(this.$('md-ink-bar').attr('style'), 'left:188px;right:0px;');

  this.$('md-tab-item:nth(1)').click();

  assert.equal(this.$('md-ink-bar').attr('style'), 'left:85px;right:88px;');

  this.$('md-tab-item:nth(0)').click();

  assert.equal(this.$('md-ink-bar').attr('style'), 'left:0px;right:191px;');
});
*/

test('it can remove a tab', function(assert) {
  this.set('items', A(['FIRST', 'SECOND']));

  this.render(hbs`
    {{#paper-tabs as |tabs|}}
       {{#each items as |item|}}
         {{#tabs.tab label=item}}{{item}} content{{/tabs.tab}}
       {{/each}}
    {{/paper-tabs}}
  `);

  assert.equal(this.$('md-tab-item:nth(0)').text().trim(), 'FIRST');
  assert.equal(this.$('md-tab-item:nth(1)').text().trim(), 'SECOND');

  assert.equal(this.$('md-tab-content.md-active').text().trim(), 'FIRST content');

  run(this, function() {
    this.get('items').removeObject(this.get('items.0'));
  });

  assert.ok(this.$('md-tab-item').length === 1);
  assert.ok(this.$('md-tab-content').length === 1);
  assert.equal(this.$('md-tab-item:nth(0)').text().trim(), 'SECOND');
  assert.equal(this.$('md-tab-content.md-active').text().trim(), 'SECOND content');
});

test('it can add a tab', function(assert) {
  this.set('items', A(['FIRST', 'SECOND']));

  this.render(hbs`
    {{#paper-tabs autoSelect=true as |tabs|}}
       {{#each items as |item|}}
         {{#tabs.tab label=item}}{{item}} content{{/tabs.tab}}
       {{/each}}
    {{/paper-tabs}}
  `);

  assert.equal(this.$('md-tab-item:nth(0)').text().trim(), 'FIRST');
  assert.equal(this.$('md-tab-item:nth(1)').text().trim(), 'SECOND');

  assert.equal(this.$('md-tab-content.md-active').text().trim(), 'FIRST content');

  run(this, function() {
    this.get('items').pushObject('THIRD');
  });

  assert.ok(this.$('md-tab-item').length === 3);
  assert.ok(this.$('md-tab-content').length === 3);
  assert.equal(this.$('md-tab-content.md-active').text().trim(), 'THIRD content');
});
