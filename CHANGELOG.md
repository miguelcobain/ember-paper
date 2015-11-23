# Ember Paper Changelog

### 0.2.10 (Nov 23, 2015)
- [#178](https://github.com/miguelcobain/ember-paper/pull/178) Listen for model changes
- [#219](https://github.com/miguelcobain/ember-paper/pull/219) Inject wormhole outlet through addon hook
- [#209](https://github.com/miguelcobain/ember-paper/pull/209) Fix issue with `border-bottom-color` in paper-select
- [#213](https://github.com/miguelcobain/ember-paper/pull/213) Fixed a few stray color references that didnt use color utility
- Update ember-cli to 1.13.13

### 0.2.9 (Sep 20, 2015)
- [#140](https://github.com/miguelcobain/ember-paper/pull/140) Implement Material Menu and Select component.
- [#171](https://github.com/miguelcobain/ember-paper/pull/171) Add support for custom validations in paper-input component.
- [#192](https://github.com/miguelcobain/ember-paper/pull/192) Add support for paper-grid-list component.
- [#194](https://github.com/miguelcobain/ember-paper/pull/194) Fixed [#173](https://github.com/miguelcobain/ember-paper/issues/173) - issue with paper-progress-circular.

### 0.2.8 (Aug 19, 2015)
- [#154](https://github.com/miguelcobain/ember-paper/pull/154) Add support for inline paper-icon in paper-input component
- [#152](https://github.com/miguelcobain/ember-paper/pull/152) Add support for .md-actions to {{paper-card}}
- [#151](https://github.com/miguelcobain/ember-paper/pull/151) Only show validation errors if user has interacted with the element
- [#138](https://github.com/miguelcobain/ember-paper/pull/138) Use sidenav and backdrop angular material styles. Use [ember-css-transitions](https://github.com/peec/ember-css-transitions).
- [#168](https://github.com/miguelcobain/ember-paper/pull/168) Added dynamic height to textarea
- [#176](https://github.com/miguelcobain/ember-paper/pull/176) Documentation fix for autocomplete
- [#170](https://github.com/miguelcobain/ember-paper/pull/170) Pass through input helper attributes

### 0.2.7 (Aug 11, 2015)
- [#132](https://github.com/miguelcobain/ember-paper/pull/132) Added autocomplete component.
- [#144](https://github.com/miguelcobain/ember-paper/pull/144) Fixed paper-icon sizes and added new size md-sm (size="sm").
- [#146](https://github.com/miguelcobain/ember-paper/pull/146) Upgrade to ember 1.13.7 and ember-cli 1.13.8.

### 0.2.6 (Jul 20, 2015)

- [#135](https://github.com/miguelcobain/ember-paper/pull/135) Fix deprecation bug in linear progress indicator.
- [#136](https://github.com/miguelcobain/ember-paper/pull/136) Added circular progress indicator.
- Update to Ember-cli 1.13.1.

### 0.2.5 (Jul 18, 2015)

- [#114](https://github.com/miguelcobain/ember-paper/pull/134) Added linear progress indicator.
- Created a color mixin. Specify `primary=true`, `accent=true` or `warn=true` to apply the respective color classes.
- Paper button now applies `md-icon-button` if `icon-button=true`.

### 0.2.4 (Jul 10, 2015)

- [#113](https://github.com/miguelcobain/ember-paper/pull/113) Added support for Ember 1.13.x `hasBlock`.

### 0.2.3 (Jul 9, 2015)

- [#120](https://github.com/miguelcobain/ember-paper/pull/120) Rewrite `{{paper-input}}` from scratch with validation messages. Deprecated `{{paper-text}}` in favor to the new `{{paper-input}}`. The transition should be easy.
- [#121](https://github.com/miguelcobain/ember-paper/issues/121) Added Changelog
