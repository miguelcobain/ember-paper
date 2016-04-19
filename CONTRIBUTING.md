# Contributing to ember-paper

## Coordination, communication and community

Many ember-paper contributors hang out on the [e-paper channel on slack](https://embercommunity.slack.com/messages/e-paper/). Not a slack user? [Get your invitation.](https://ember-community-slackin.herokuapp.com/)

## Coding style

* **Suave.** ember-paper uses the [ember-suave](https://github.com/DockYard/ember-suave) coding style.

* **jscs.** Before submitting a pull request,
check for coding style issues with  `jscs -c .jscsrc app addon`.

* **Actions.** Accept action closures rather than strings representing action names.
`{{some-component someAction=(action "myAction")}}`, not `{{some-component someAction="myAction" param="the stuff" target=someTarget}}`. Invoke the action with `this.sendAction('onWhatever');`. There is no need to test for the presence of `onWhatever` as `sendAction` handles that situation.

* **Encapsulation.** When communicating with a private ember-paper component, bind as many properties as are needed.
When communicating between two public ember components, use `nearestOfType` in a computed property to find the outer component (for pre 2.3 compatibility), and override it when yielding a contextual component.
For example, `ember-paper-inner` is a private component:
```hbs
{{paper-dialog-inner fullscreen=fullscreen onOutsideClick=onOutsideClick}}
```

* **Capitalization and naming**

 * Use camelCase for variable names, formal arguments, parameters, and all other uses, except as below.

 * This includes action names, even those that correspond to JavaScript native events, such as
`{{some-component onClick=(action "someAction")}}`, not `{{some-component onclick=(action "someAction")}}`.

 * Use SHOUTING_SNAKE_CASE for constants. `const NUMBER_OF_THINGIES = 10;`.

 * As required by Ember, component names, module names, and file names should continue to be kebab-cased, such as
`{{paper-input}}` and the filepath `ember-paper/addon/components/paper-input.js`.

* **Importing**

 * Import the module, then use const object destructing to extract the desired methods. For example,
```javascript
import Ember from 'ember';
const { computed } = Ember;
```

 * When the destructured object assignment statement exceeds 80 columns, put each variable it its own line:
```javascript
const {
  $,
  Mixin,
  String: { htmlSafe },
  RSVP: { Promise },
  computed,
  on,
  inject: { service },
  run: { scheduleOnce }
} = Ember;
```
 * Order the imported variables in order of appearance, or other logical order.

## Converting components from Angular Material

* **Stylesheets.** Use the Angular Material stylesheets as-is. Replicate Angular markup in `ember-paper`.

* **Naming.** Use an ember-paper name for components in the form `{{paper-*}}`.

* **Attributes.** Convert angular element attributes (if they apply to your implementation) by removing the `md-*` suffix and camelCasing it like every other property:
```javascript
<md-tabs md-dynamic-height md-border-bottom md-some-property="20">
```
becomes
```javascript
{{paper-tabs dynamicHeight=true borderBottom=true someProperty="20"}}
```
* **Angle bracket elements.** Any *user* markup that would require the use of an angle bracket component, such as
`<md-some-element>` should be implemented as an ember component, such as `{{paper-some-element}}`.

* **Features.** Seek to provide feature parity using Angular Material styles, but implemented in an Ember-centric way.
