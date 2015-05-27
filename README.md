# Ember Paper [![Build Status](https://travis-ci.org/miguelcobain/ember-paper.svg)](https://travis-ci.org/miguelcobain/ember-paper) [![Ember Observer Score](http://emberobserver.com/badges/ember-paper.svg)](http://emberobserver.com/addons/ember-paper)

[![Join the chat at https://gitter.im/miguelcobain/ember-paper](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/miguelcobain/ember-paper?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This project aims to bring Google's new [Material Design](https://www.google.com/design/spec/material-design/introduction.html) to Ember. The goal is to encapsulate everything possible in Ember components. This project is packaged as an [Ember-cli](http://www.ember-cli.com/) addon.

## Installation

Temporary workaround. For now you need to run `$ npm install --save-dev broccoli-autoprefixer` before installing ember-paper.

Install the ember-cli addon in your ember-cli project:

```
$ ember install ember-paper
```

Ember-paper uses sass for its styles. To import them run:

```
$ ember install ember-cli-sass
```

and then create a file in `app/styles/app.scss` and import the styles at the beginning of your file:

```sass
@import 'ember-paper';
```

All the components and styles are ready to use in your application templates.
Navigate through the docs to understand how to use each component.

### Content Security Policy

Ember Paper uses fonts from Google Fonts, so the URL to them has to be white listed.  You can set this by adding to the Content Security Policy defined in `config/environment.js` like so:

```js
ENV.contentSecurityPolicy = {
  'default-src': "'none'",
  'script-src': "'self'",
  'font-src': "'self' http://fonts.gstatic.com",
  'connect-src': "'self'",
  'img-src': "'self'",
  'media-src': "'self'"
}
```

You can find out more information on the CSP addon page [here](https://github.com/rwjblue/ember-cli-content-security-policy#ember-cli-content-security-policy).

## Contribution

This is a very ambitious project. Google's design specs are extensive, and not trivial to implement. `ember-paper` is heavily based on [Angular Material](https://github.com/angular/material) and [Web Starter Kit (material-sprint branch)](https://github.com/google/web-starter-kit/tree/material-sprint). These seem to be the most useful resources at the moment. If you feel like porting or fixing an element or two, please drop a pull request or issue at GitHub!


I believe that with the help of everyone we can bring these amazing design spec to Ember in a modular and robust way. The Ember way. **Help us on Github!**
