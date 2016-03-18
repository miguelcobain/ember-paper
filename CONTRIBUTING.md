# Contributing to ember-paper

## Coordination, communication and community

Many ember-paper contributor hang out on the [ember-paper channel on slack](https://embercommunity.slack.com/messages/ember-paper/). Not a slack user? [Get your invitation.](https://ember-community-slackin.herokuapp.com/)

## Coding style

* ember-paper uses the [ember-suave](https://github.com/DockYard/ember-suave) coding style.

* Before submitting a pull request,
check for coding style issues with  `jscs -c .jscsrc app addon`.

## Actions

* Action closures are preferred to strings representing action names.

* Properties representing an action should be camelCased, e.g. `onClose`, rather than `on-close`.

## Importing

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

* Use an ember-paper name for components. Convert angular elements attributes to ember boolean properties.
```javascript
<md-tabs md-dynamic-height md-border-bottom>
```
becomes
```javascript
{{paper-tabs dynamicHeight=true borderBottom=true}}
```

* Seek to provide feature parity using Angular Material styles, but implemented in an Ember-centric way.
