# Ember Paper [![Build Status](https://travis-ci.org/miguelcobain/ember-paper.svg)](https://travis-ci.org/miguelcobain/ember-paper) [![Ember Observer Score](http://emberobserver.com/badges/ember-paper.svg)](http://emberobserver.com/addons/ember-paper)

[![Join the chat at https://gitter.im/miguelcobain/ember-paper](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/miguelcobain/ember-paper?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This project aims to bring Google's new [Material Design](https://www.google.com/design/spec/material-design/introduction.html) to Ember. The goal is to encapsulate everything possible in Ember components. This project is packaged as an [Ember-cli](http://www.ember-cli.com/) addon.

## Installation

Install the ember-cli addon in your ember-cli project:

```
$ ember install ember-paper
```

This should also automatically create an scss file under `app/styles/app.scss` with `@import 'ember-paper';` and install `ember-cli-sass`.

Sass is an important part of Ember-paper. Using sass you can override default variables and easily change the default behavior of Ember-paper.

All the components and styles are ready to use in your application templates.
Navigate through the docs to understand how to use each component.

**Note** If upgrading from a previous version of ember-paper and you are seeing compile errors around `app.scss|sass` not existing, please make sure to remove `broccoli-sass` from your `package.json`, remove your `node_modules` and reinstall.

### Content Security Policy

Ember Paper uses fonts from Google Fonts, so the URL to them has to be white listed.  You can set this by adding to the Content Security Policy defined in `config/environment.js` like so:

```js
ENV.contentSecurityPolicy = {
  'default-src': "'none'",
  'script-src': "'self' 'unsafe-inline'",
  'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
  'font-src': "'self' fonts.gstatic.com",
  'connect-src': "'self'",
  'img-src': "'self' data:",
  'media-src': "'self'"
}
```

We also need to allow `data:` in `img-src` because of a [current hack](https://github.com/miguelcobain/ember-paper/blob/master/app%2Fstyles%2Fpaper-button.scss) in paper-button.

You can find out more information on the CSP addon page [here](https://github.com/rwjblue/ember-cli-content-security-policy#ember-cli-content-security-policy).

## Contribution

This is a very ambitious project. Google's design specs are extensive, and not trivial to implement. `ember-paper` is heavily based on [Angular Material](https://github.com/angular/material) and [Web Starter Kit (material-sprint branch)](https://github.com/google/web-starter-kit/tree/material-sprint). These seem to be the most useful resources at the moment. If you feel like porting or fixing an element or two, please drop a pull request or issue at GitHub!


I believe that with the help of everyone we can bring these amazing design spec to Ember in a modular and robust way. The Ember way. **Help us on Github!**
