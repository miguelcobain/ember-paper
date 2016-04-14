# Ember Paper Changelog

### 1.0.0

#### Migrating from releases prior to 1.0

Version 1.0 introduces many API changes relative to previous releases. In addition to the specific changelog listing below, the follow general changes have been made. Note that during the development of 1.0, the `wip/v1.0.0` branch reflects the most up-to-date version, with a mixture of updated and to-be-updated components.

Contributions and pull requests are always welcome. Contributors may often be found on the slack.com #e-paper channel. Building the dummy application by installing `ember-paper` as if it were an application will provide you an up-to-date interactive demo, templates, and code samples.

- Attributes are now `camelCased` rather than `kebob-cased`.
- Components which accept user input, such as `paper-input`, `paper-checkbox`, and `paper-select` now receive their input via the one-way `value` attribute and notify of a changed value by the `onChange` actions.
- When provided by the API, `onChange` actions are required and throw an assertion if not provided.
- Actions maybe be specified by a string action name (`onChange="updateValue"`) or an action closure (`onChange=(action (mut "myValue"))`). If you need to specify a target or additional parameter, you must use an action closure.
- Many attributes have been renamed for clarity and consistency. See the specific changes below.

#### 1.0.0 specific changes
- [1a9b641](https://github.com/miguelcobain/ember-paper/commit/1a9b6411a8ca30f3e9440d8585dc0f1ff4ff7649) paper-progress-circular now uses `diameter` instead of `md-diameter`
- [cf2a8da](https://github.com/miguelcobain/ember-paper/commit/cf2a8da350ea805e11eef36914ae76213b4c9f24) paper-progress-linear now uses `bufferValue` instead of `buffer-value`
- [#285](https://github.com/miguelcobain/ember-paper/pull/285) paper-checkbox now uses *actions up, data down*. `onChange` action is mandatory.
- [#286](https://github.com/miguelcobain/ember-paper/pull/286) paper-radio no longer has the class `paper-radio`
- [#286](https://github.com/miguelcobain/ember-paper/pull/286) paper-radio now uses `groupValue` instead of `selected`
- [#286](https://github.com/miguelcobain/ember-paper/pull/286) paper-radio now sends the action `onChange` instead of `changed` and it is mandatory (see ddau)
- [#303](https://github.com/miguelcobain/ember-paper/pull/303) paper-menu template may now specify `dense=true` to display menu items compactly
- [#313](https://github.com/miguelcobain/ember-paper/pull/313) paper-backdrop `tap` action renamed `onTap` and required action closure.
- [#326](https://github.com/miguelcobain/ember-paper/pull/319)
  - paper-input now uses a passThru hash rather than individual attr-xxx attributes to pass attribute binds through to the underlying input.
  - The required attribute can now be used to mean native validation, required label styling with an asterisk, and/or native html5 required validation.
  - paper-input now uses `customValidations` instead of `customValidation`. customValidations has a new format.
  - the error messages can now be overriden by specifiying `errorMessages=(hash required="new message")`
  - first validation message now has suffix `-0` in its id
  - paper-checkbox now uses *actions up, data down*. `onChange` action is mandatory.
- [#324](https://github.com/miguelcobain/ember-paper/pull/324)
  - paper-button now uses `iconButton` instead of `icon-button`
  - paper-button now uses the action `onClick` instead of `action`
- [#334](https://github.com/miguelcobain/ember-paper/pull/334)
  - paper-menu-item now uses action `onClick` instead of `action`.
  - paper-item now uses action `onClick` instead of `action`.
  - paper-menu now uses `value` instead of `model`.
  - paper-checkbox now uses `value` instead of `checked`.
  - paper-switch now uses `value` instead of `checked`.
  - paper-select now uses a required `onChange` action.
  - paper-select now uses attribute `itemLabelCallback` instead of `item-label-callback`.
  - paper-select now uses attribute `getItems` instead of `on-open`.
  - paper-menu now uses attribute `isOpen` instead of `is-open`.

### 0.2.11

- [#253](https://github.com/miguelcobain/ember-paper/pull/253) Add `closeOnClick` to paper-sidenav
- [#255](https://github.com/miguelcobain/ember-paper/pull/255) Add class to backdrops
- [#260](https://github.com/miguelcobain/ember-paper/pull/260) Set jquery version to 1.11.3
- [#261](https://github.com/miguelcobain/ember-paper/pull/261) Fixed [#237](https://github.com/miguelcobain/ember-paper/issues/237) - didInsertElement deprecation warning for components using proxiable-mixin.
- [#271](https://github.com/miguelcobain/ember-paper/pull/271) Add support for positional param `{{paper-icon "check"}}`

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
