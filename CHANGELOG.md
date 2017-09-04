# Ember Paper Changelog

#### Migrating from releases prior to 1.0

Version 1.0 introduces many API changes relative to previous releases. In addition to the specific changelog listing below, the follow general changes have been made. Note that during the development of 1.0, the `master` branch reflects the most up-to-date version, with a mixture of updated and to-be-updated components.

Contributions and pull requests are always welcome. Contributors may often be found on the [#e-paper channel on slack](https://embercommunity.slack.com/messages/e-paper/). Building the dummy application by installing `ember-paper` as if it were an application will provide you an up-to-date interactive demo, templates, and code samples.

- Attributes are now `camelCased` rather than `kebab-cased`.
- Components which accept user input, such as `paper-input`, `paper-checkbox`, `paper-switch` and `paper-select` now receive their input via the one-way `value` attribute and notify of a changed value by the `onChange` actions.
- When provided by the API, `onChange` actions are required and throw an assertion if not provided.
- Actions maybe be specified by a string action name (`onChange="updateValue"`) or an action closure (`onChange=(action (mut "myValue"))`). If you need to specify a target or additional parameter, you must use an action closure.
- Many attributes have been renamed for clarity and consistency. See the specific changes below.
- `paper-icon`'s `size` attribute now takes a size in pixels, and `lg` or `sm` values are no longer supported.
- renamed the `paper-radio-group` `paper-radio` to just `radio` -- usage would now be `group.radio` as opposed to `group.paper-radio`.
- Flex and layout attributes are replaced by classes (see [the documentation](http://miguelcobain.github.io/ember-paper/#/layout/introduction)). `flex=true` on Ember Paper components has also been removed and replaced by classes.

### 1.0.0-beta.3
- [#802](https://github.com/miguelcobain/ember-paper/pull/802) allow icons to have tooltips.
- [#772](https://github.com/miguelcobain/ember-paper/pull/772) fix tabs ink-bar in dialogs.
- [db3b46c](https://github.com/miguelcobain/ember-paper/commit/db3b46cb3f7c6090b1fb5707c841a855fd5a4de5) paper-tooltip is now a tagless component and proxies `class` attributes to the tooltip element class.
- [81c4acd](https://github.com/miguelcobain/ember-paper/commit/81c4acd4f2658b895adbde5c91f5ceea1865e6d3) Speed dials are now available.

### 1.0.0-beta.2
- [8544228](https://github.com/miguelcobain/ember-paper/commit/854422819791dfbda205f5ab437887129f699db1) fix going to tabs next page
- [25432c9](https://github.com/miguelcobain/ember-paper/commit/25432c965205eb2512019437507cf840e1f8265e) and [13a0294](https://github.com/miguelcobain/ember-paper/commit/13a029427a14730d8d35a0c923d9fcf7362a0eb9) add `center` and `stretch` options to tabs. `stretch` can be a match media query.
- [#632](https://github.com/miguelcobain/ember-paper/pull/632) and [#623](https://github.com/miguelcobain/ember-paper/pull/623) BUGFIX - paper-chips:
  - Don't explicitly close autocomplete on input blur.
  - Don't use `cursor: text` if `readOnly` is true.
  - Adds the ability to click a chip to highlight it.
  - Adds the ability to click anywhere in the chips element to give the input focus.
  - Fixed issues with focus being left behind on autocomplete and contact chips elements.
- [#377](https://github.com/miguelcobain/ember-paper/issues/377) BUGFIX - `progress-linear`: decimal values resulted in buggy animation
- [#770](https://github.com/miguelcobain/ember-paper/pull/770) Allow `paper-chips` and `paper-contact-chips` to have customizable search action and matcher.

### 1.0.0-beta.1 (July 20, 2017) - Chester Bennington release. RIP.
- [#730](https://github.com/miguelcobain/ember-paper/pull/730) ready for fastboot 1.0
- [#752](https://github.com/miguelcobain/ember-paper/pull/752) Tooltips are now available. Contrasts are now set correctly.
- [#750](https://github.com/miguelcobain/ember-paper/pull/750) Toasts are now available.
- [#753](https://github.com/miguelcobain/ember-paper/pull/753), [#755](https://github.com/miguelcobain/ember-paper/pull/755) and [bc90bea](https://github.com/miguelcobain/ember-paper/commit/bc90beae6194c0d12644ffdff4aff1caddadee72) Tabs are now available.
- [#739](https://github.com/miguelcobain/ember-paper/pull/739) Grid list was updated:
  - now uses camelCased attributes, just like the rest of the project
  - uses contextual components api, i.e `{{#paper-grid-list as |grid|}}{{#grid.tile}}`.
  - no more separate responsive-related attributes. Related attributes were merged
  and now you can specify responsive breakpoints in the same attribute.
  - see the docs for more information on the new usage
- [#615](https://github.com/miguelcobain/ember-paper/pull/615) this fixes a problem with paper-chips on blur ([#611](https://github.com/miguelcobain/ember-paper/issues/611))
- [d0e0b94](https://github.com/miguelcobain/ember-paper/commit/d0e0b948fa0fadbbab3151ba83b252dc955d525c) paper-item now accepts an `href` attribute. Hint: use `ember-href-to` addon to make paper-items that change routes. Same for buttons!
- [#737](https://github.com/miguelcobain/ember-paper/issues/737) fixed bug that happened when overriding colors with a custom palette

### 1.0.0-alpha.20 (June 26, 2017)
- [#679](https://github.com/miguelcobain/ember-paper/issues/679) fix outline on paper-menu
- [#699](https://github.com/miguelcobain/ember-paper/issues/699) Removed paper-wormhole initializer in favor of the `contentFor` hook. This makes ember-paper more acceptance test friendly.
- updated Angular Material to 1.1.4 version
  - paper-item secondary controls now need to be wrapped in a `<div class="md-secondary-container">` to get the proper padding and positioning.
  - paper-progress-circular was rewritten using svg. No longer supports `"25%"` like strings for diameter. Has some new interesting customization features.
  - no more backporting styles needed!
- [#707](https://github.com/miguelcobain/ember-paper/pull/707) paper-dialog-inner's image load events are now properly cleaned up
- [51a6250](https://github.com/miguelcobain/ember-paper/commit/51a6250bebf1200e2b38d21c5655333540543bb8) icons are now absolutely sized (line-height, min-height, font-size, etc), from the `size` property
- [#720](https://github.com/miguelcobain/ember-paper/issues/720) add `opaque` option to `paper-dialog` component (defaults to `true`).
- [#726](https://github.com/miguelcobain/ember-paper/pull/726) update eps to 1.8.5 version. An internal change, but clears some deprecation messages and bugs.

### 1.0.0-alpha.19 (March 20, 2017)
- [56b84cf](https://github.com/miguelcobain/ember-paper/commit/56b84cf6b30e01dcf64961c4f75e101d0899593c) fix sliders on android browsers
- [77274a0](https://github.com/miguelcobain/ember-paper/commit/77274a0a60e19b19a571176d3035c1e99df09dde) set md-dragging class correctly. attach recognizers to the whole slider. big usability improvement.
- [#670](https://github.com/miguelcobain/ember-paper/pull/670) paper-form yielded values had the length of validation messages. Now they are correctly coalesced to booleans.

### 1.0.0-alpha.18 (March 7, 2017)
- [5c66511](https://github.com/miguelcobain/ember-paper/commit/5c665118a9acc9976f6e9b0030dd220fdc8f0ef8) bump ember-composability-tools to `0.0.8`
- [78b6efb](https://github.com/miguelcobain/ember-paper/commit/78b6efb9791aea365f57fd186f0a6e2aead2cb66) and [7cb32b0](https://github.com/miguelcobain/ember-paper/commit/7cb32b0c61f740cb2dd0740077f71c168da8ac3a) paper-form: trigger onValidityChange when global isTouched changes
- [4b168ec](https://github.com/miguelcobain/ember-paper/commit/4b168ecfcebd3a68551de587d78e315f7268fcef) yield isTouched and isInvalidAndTouched

### 1.0.0-alpha.17 (March 6, 2017)
- [9f3da49](https://github.com/miguelcobain/ember-paper/commit/9f3da4974b02c2d5f8bffa36fbf6141a7fceb9f1) Fixes bug in slider dragging.
- [7ec7a7b](https://github.com/miguelcobain/ember-paper/commit/7ec7a7beb4e8f3df2de3c8e7618e6a39b318b73d) Removes accidental text selection while dragging slider on Safari.
- [94c8ad9](https://github.com/miguelcobain/ember-paper/commit/94c8ad9eb16a6c6501592b6bfae62d4d1158fc0f) Validation params can now change and the correct validation messages will appear (e.g change required from `true` to `false` after render).
- [3cec77c](https://github.com/miguelcobain/ember-paper/commit/3cec77ce136f9c9f7142e0d8795afb26571af9b5) Allow sidenav's `lockedOpen` to be toggled.
- [#649](https://github.com/miguelcobain/ember-paper/pull/649) `paper-form` now renders a `<form>` html tag. This is for the greater good. If you want to keep it tagless, please use `{{#paper-form tagName=""}}`.
- [9c09fd0](https://github.com/miguelcobain/ember-paper/commit/9c09fd0f0dfca7ca1d93fb48d07770b9036b1758) update angular material to `v1.0.7`
- [948db82](https://github.com/miguelcobain/ember-paper/commit/948db825f9814d2d1b4a259ac6e523a00bc32c7d) update angular material to `v1.0.8`
- [f407257](https://github.com/miguelcobain/ember-paper/commit/f4072573d324b0df9fd8383859ba8f02d9e8de39) checkboxes now have an optional indeterminate mode. If `indeterminate` is true it will always take precedence over `value`.
- [8a5e370](https://github.com/miguelcobain/ember-paper/commit/8a5e370fe18829db5dae7e89f7744848dca186cf) update angular material to `v1.0.9`
- [10fddd9](https://github.com/miguelcobain/ember-paper/commit/10fddd9027f28c1bdfdab903d067377211536d76) Enhance customizability paper-{form, input, radio-group}
- [a86bb64](https://github.com/miguelcobain/ember-paper/commit/a86bb6422d5f6f458dbc6b1eda123fcf136f9f0a) fix paper-slider on iOS devices
- [#663](https://github.com/miguelcobain/ember-paper/pull/663) Fix binding style attribute warning in paper-backdrop
- [a03eccf](https://github.com/miguelcobain/ember-paper/commit/a03eccf7e096b5a39b8a053a2679d3b366cc04b6) paper-form's `onValidityChange` now sends `isValid`, `isTouched` and `isInvalidAndTouched`

### 1.0.0-alpha.16 (February 14, 2017) <--- forever alone
- [#636](https://github.com/miguelcobain/ember-paper/pull/636) Consuming apps can now specify `ENV['ember-paper'].insertFontLinks` to prevent the insertion of google fonts links in the head tag. This is especially useful if you want to include your own fonts.
- [4d363ff](https://github.com/miguelcobain/ember-paper/commit/4d363ff0cf810ecd38c8c5a9d9d12d5f6f7f912f) `paper-slider` is now a DDAU component. It will trigger an `onChange` action with the new value. It is up to you to update the value yourself (like `paper-input`, `paper-checkbox`, `paper-switch`, etc).

### 1.0.0-alpha.15 (January 26, 2017)
- [#572](https://github.com/miguelcobain/ember-paper/pull/572) updated paper-slider. Smoother sliding and you can slide without having the cursor above the slider, like normal sliding.
- [#626](https://github.com/miguelcobain/ember-paper/pull/626) Add autocorrect and autocapitalize to paper-input passThru attributes
- [#629](https://github.com/miguelcobain/ember-paper/pull/629) ember-paper is now able to retrieve the parent application while being used from another addon
- [1465662](https://github.com/miguelcobain/ember-paper/commit/14656624caf016270f90a8fd2abc4d445cb66088) update eps and ebd
- [#594](https://github.com/miguelcobain/ember-paper/pull/594) ember-paper is now compatible with ember-engines. As a side effect, we're no longer importing `hammerjs`, `matchmedia-polyfill` and `propagating-hammerjs` from bower. Feel free to delete them from your app's bower.json. ember-paper will keep track of its dependencies now.
- [e3a2f6b](https://github.com/miguelcobain/ember-paper/commit/e3a2f6bed29b0eff438b079c6fe3fe3c84b56d09) update ember and ember-cli

### 1.0.0-alpha.14 (January 6, 2017)
- [9c4b874](https://github.com/miguelcobain/ember-paper/commit/9c4b8741281c302b601cf7f428b94ae8af84aeb6) paper-item now proxies radio buttons
- [f07be76](https://github.com/miguelcobain/ember-paper/commit/f07be761164cc97b55e2fa4ae45703e6619c9d4b) templates are now in the `addon` folder

### 1.0.0-alpha.13 (December 29, 2016)
- [57d6b40](https://github.com/miguelcobain/ember-paper/commit/57d6b40c43211fef92533f84eb6e17794a2ce947) bump eps (1.0.0), ebd and wormhole
- [695650](https://github.com/miguelcobain/ember-paper/commit/695650fc8964bcd6bd1ce02f2737cf4e429899ab) Make backdrops work in iOS
- [#600](https://github.com/miguelcobain/ember-paper/pull/600) fix unwanted repositions in async paper-select

### 1.0.0-alpha.12 (December 14, 2016)
- [4134ccd](https://github.com/miguelcobain/ember-paper/commit/4134ccdcdf5e18c79d26a26079c2df79a3ef3a7f) remove `onValidityChange` call on component destroy
- [a463108](https://github.com/miguelcobain/ember-paper/commit/a463108b8324fa101d0557783262549a1c1b6273) remove leftover auto-generated `app.scss` that was causing some errors

### 1.0.0-alpha.11 (December 2, 2016)
- [e923c51](https://github.com/miguelcobain/ember-paper/commit/e923c517ae10cfb23a86e28207c8496f9a74f377) fix sidenav opening glitch
- [741e03e](https://github.com/miguelcobain/ember-paper/commit/741e03ed5cbd5b75306ac9bbad948482b888027f) fix bug on sidenav unregistration
- [6c980fb](https://github.com/miguelcobain/ember-paper/commit/6c980fbd28c79383a13dfca3cf190012fefa91e9) `paper-item` now yields `checkbox`, `switch` and `button` controls. These controls get proxied by `paper-item` clicks.
- [#577](https://github.com/miguelcobain/ember-paper/pull/577) `paper-list` update. Specify `seconday=true` when you want controls to be placed on the right side of `paper-item`.
- [350a2c7](https://github.com/miguelcobain/ember-paper/commit/350a2c7418c5422d5daef4d1cad9acfc22cf8c37) Use timeouts to delete dialog clones after transition. Fixes bug where dialog clones were not removed.

### 1.0.0-alpha.10 (November 24, 2016)
- [82c53e4](https://github.com/miguelcobain/ember-paper/commit/82c53e4f91bf271d44bf719835cc2530a1913c91) Bugfix for for npm module resolution

### 1.0.0-alpha.9 (November 24, 2016)
- [#562](https://github.com/miguelcobain/ember-paper/pull/562) Close autocomplete autocomplete's dropdown on tabKey
- [#563](https://github.com/miguelcobain/ember-paper/pull/563) Make autocomplete more similar to paper-input (required star and passThru hash)
- [a4acae4](https://github.com/miguelcobain/ember-paper/commit/a4acae4bb014a476506603e2e82e5d6467f30efe) Remove usage of `Ember.K`
- [#560](https://github.com/miguelcobain/ember-paper/pull/560) `paper-autocomplete` works with `allowClear` + floating label
- [#567](https://github.com/miguelcobain/ember-paper/pull/567) `paper-autocomplete-highlight` now highlights non-string labels
- [#527](https://github.com/miguelcobain/ember-paper/pull/527) Add paper-chips & paper-contact-chips
- [#571](https://github.com/miguelcobain/ember-paper/pull/571) Allow css class on paper dialog and its container

### 1.0.0-alpha.8 (November 10, 2016)
- [#542](https://github.com/miguelcobain/ember-paper/pull/542) paper-form now yields a submit button
- [#549](https://github.com/miguelcobain/ember-paper/pull/549) Allow `title` attribute in paper-button
- [#551](https://github.com/miguelcobain/ember-paper/pull/551) avoids calling setValue when `paper-input` is destroyed
- [#552](https://github.com/miguelcobain/ember-paper/pull/552) `paper-autocomplete` searchText is now reseted properly

### 1.0.0-alpha.7 (November 2, 2016)
- [#531](https://github.com/miguelcobain/ember-paper/pull/531) paper-select focus fix - doesn't call focusTarget.focus if there is no focusTarget (which is perfectly possible)
- [#507](https://github.com/miguelcobain/ember-paper/issues/507) replace all instances of attribute based flex layout and replace with class based ones
- [#469](https://github.com/miguelcobain/ember-paper/pull/469) Set the value before growing the textarea on render
- [#541](https://github.com/miguelcobain/ember-paper/pull/541) allow touch devices to interact with autocomplete

### 1.0.0-alpha.6 (October 27, 2016)
- [#395](https://github.com/miguelcobain/ember-paper/pull/395) The Great Update of paper-menu et al:
  - `paper-menu` was updated. It uses  [ember-basic-dropdown](https://github.com/cibernox/ember-basic-dropdown) under the hood and the API is the same
  - `paper-select` and `paper-autocomplete` were updated. They use  [ember-power-select](https://github.com/cibernox/ember-power-select) under the hood and the API is the same
  - See the referenced projects and ember-paper's documentation examples to understand the new API
  - Special thanks to the champions of this update @xomaczar and @ibarrick

### 1.0.0-alpha.5 (October 13, 2016)
- [#521](https://github.com/miguelcobain/ember-paper/pull/521) Update Angular SCSS import to work with yarn and npm3 flat node_modules
- [#520](https://github.com/miguelcobain/ember-paper/pull/520) fixes issues with people seeing `regeneratorRuntime is not defined`
- [#515](https://github.com/miguelcobain/ember-paper/pull/515) paper-icon: set md-font-icon attribute to apply correct width

### 1.0.0-alpha.4
- [#466](https://github.com/miguelcobain/ember-paper/pull/466) added autoprefixer configuration option
- [#472](https://github.com/miguelcobain/ember-paper/pull/472) update ember-css-transitions
- [#511](https://github.com/miguelcobain/ember-paper/issues/511) allow inner dialog clicks to bubble
- [5f35cf5](https://github.com/miguelcobain/ember-paper/commit/5f35cf517530b06c850282a757d49096bff9a22b) Glimmer 2 compatible
- [#506](https://github.com/miguelcobain/ember-paper/pull/506) Add super calls inside paper-input lifecycle hooks (fixes paper-form)

### 1.0.0-alpha.3
- [#441](https://github.com/miguelcobain/ember-paper/pull/441) fixed fastboot service check
- [#449](https://github.com/miguelcobain/ember-paper/pull/449) Update `ember-css-transitions` to `0.1.4`
- [#446](https://github.com/miguelcobain/ember-paper/pull/446) update `ember-wormhole` to `^0.4.0`

### 1.0.0-alpha.2

- This version uses an updated version of `ember-css-transitions` from github rather than npm.
- [#384](https://github.com/miguelcobain/ember-paper/pull/384) update sidenav
  - `paper-nav-container` was renamed to `paper-sidenav-container`
  - `locked-open` was renamed to `lockedOpen`
  - sidenav opening now follows DDAU with the `open` attribute and `onToggle` action
  - animations work
  - there is a `paperSidenav` service that allows sidenav toggling across the application
  - `paper-sidenav-toggle` no longer sets a class to hide at certain breakpoints
  - `paper-sidenav-toggle` is now tagless. It is essentially a functional component that yields an action to its block
  - `paper-sidenav` now can use a `position` param that positions the sidenav `left` (default) or `right`
  - `paper-backdrop` action `onTap` changed to `onClick`
- [#408](https://github.com/miguelcobain/ember-paper/pull/408) added paper-form component. `paper-input`'s `onInvalid` action renamed to `onValidityChange`
- [#430](https://github.com/miguelcobain/ember-paper/pull/430) added fastboot support. Removed errors associated with `document` when running `ember fastboot`

### 1.0.0-alpha.1

- [#365](https://github.com/miguelcobain/ember-paper/pull/365) paper-button: Support for `fab` and `mini`.
- [#362](https://github.com/miguelcobain/ember-paper/pull/362) paper-toolbar: Support for `tall`.
- [#364](https://github.com/miguelcobain/ember-paper/pull/364) Support installation via both npm versions 2 and 3.
- [#367](https://github.com/miguelcobain/ember-paper/pull/367) You should now use `paper-toolbar-tools` component (or respective contextual component) instead of the `md-toolbar-tools` class.
- [#370](https://github.com/miguelcobain/ember-paper/pull/370) `paper-icon` now once again supports kebab cased icon names, and a `size` in pixels.
- [#372](https://github.com/miguelcobain/ember-paper/pull/372) `paper-button` can generate `a` link elements, with an href and optional target attribute.

### 1.0.0-alpha.0
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
- [#338](https://github.com/miguelcobain/ember-paper/pull/338)
  - paper-card now uses contextual components. The old paper-card-content and paper-card-title components still work.
  - paper-card now supports the same configurations as the [Angular Material](https://material.angularjs.org/1.0.6/demo/card) version.
- Updated the dependency on hammer from `hammerjs` to `hammer.js` . (Also backported to 0.2.14.)
  - Update your project's `bower.json` to require `"hammer.js": "^2.0.8"`. Remove `bower_components/hammerjs`. Run `bower cache clean`, then `bower install`.
- [5521f3b](https://github.com/miguelcobain/ember-paper/commit/5521f3b246be4c24cd54f5e0b5383fc9e78e24dd ) Validation status on `paper-input` is exposed via `onInvalid` action.

### 0.2.14

  - Updated the dependency on Hammer.js from `hammerjs` to `hammer.js`.
  - Update your project's `bower.json` to require `"hammer.js": "^2.0.8"`. Remove `bower_components/hammerjs`. Run `bower cache clean`, then `bower install`.

### 0.2.13

- [#322](https://github.com/miguelcobain/ember-paper/pull/322) Remove documentation for searchTest in inverse block for `{{paper-autocomplete}}`.
- [#323](https://github.com/miguelcobain/ember-paper/pull/323) Pass item through as expected rather than label to itemComponent for `{{paper-autocomplete}}`.
- [#347](https://github.com/miguelcobain/ember-paper/pull/347) Don't import Hammer or matchMedia when building in node (FastBoot support)

### 0.2.12

- [#307](https://github.com/miguelcobain/ember-paper/pull/307) Add paper-card title components
- [#283](https://github.com/miguelcobain/ember-paper/pull/283) Adds support for `fullTextSearch` attribute on `{{paper-autocomplete}}`. Enables passing Promises to the `model` attribute on `{{paper-autocomplete}}`. Docs updated.
- [#311](https://github.com/miguelcobain/ember-paper/pull/311) Fixed issue with `paper-wormhole` div in `<head>` tag.

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
