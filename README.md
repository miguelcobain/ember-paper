# Ember Paper [![Build Status](https://travis-ci.org/miguelcobain/ember-paper.svg)](https://travis-ci.org/miguelcobain/ember-paper) [![Ember Observer Score](http://emberobserver.com/badges/ember-paper.svg)](http://emberobserver.com/addons/ember-paper) [![Slack Status](https://ember-community-slackin.herokuapp.com/badge.svg)](https://ember-community-slackin.herokuapp.com/)

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

This is no longer used in newer ember-cli apps. However, here are the instructions if you need them.
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

We also need to allow `data:` in `img-src` because of a [current hack](https://github.com/angular/material/blob/v1.1.4/src/components/button/button.scss#L123) in paper-button styles.

You can find out more information on the CSP addon page [here](https://github.com/rwjblue/ember-cli-content-security-policy#ember-cli-content-security-policy).

## Version Roadmap

**0.2** The initial implementation of `ember-paper` culminated in version 0.2 (at the time of this writing, 0.2.12). This version receives security and critical bug fixes only.

Version 0.2 is a good choice if you need to use `ember-paper` now in your application, and you have tested the components you use and confirmed that they work to your satisfaction. If you encounter bugs, you'll likely need to fix them yourself, as the `ember-paper` team is focused on completing version 1.0. When version 1.0 is released, you will need to adapt to the the API changes as part of your update.

Version 0.2 documentation can be found [here](https://forge512.github.io/ember-paper/).

**1.0** All new development work is focused on the master branch, which will be released as version 1.0.0. This version uses the Angular Material style sheets, which are imported and processed automatically during the build process. This allows `ember-paper` to have excellent fidelity with regard to the Angular version.

The master branch contains significant API changes relative to version 0.2 and earlier. Modern Ember coding style and naming conventions are used. These changes are detailed in the [change log](CHANGELOG.md).

The master branch is a good choice if your project's timetable jibes with the components which have been migrated from 0.2 or which are expected to be before your project's completion. The master branch has more features, and the components which have been completed are more robust, better-designed, and in accordance with today's Ember best practices, such as "Data Down, Actions Up". Please note that 1.0 is only compatible with Ember 2.3.x and above.

If you encounter difficulties with the master branch, the work you do to diagnose and fix bugs will accelerate the availability version 1.0. In addition, the team is motivated to help you help the project with your improvements.

If you need a component for your project which has not yet been migrated to version 1.0 standards, the team welcomes your contribution.

## Resources

- The team can often be found on the [#e-paper channel on slack](https://embercommunity.slack.com/messages/e-paper/). Features and designs are discussed there prior to implementation. Get your invite to Ember Community Slack [here](https://ember-community-slackin.herokuapp.com/).

- The [GitHub milestone issue](https://github.com/miguelcobain/ember-paper/issues/249) tracks our progress to version 1.0.

- The team coordinates who is working on what component(s) with a [shared canvas document](https://usecanvas.com/emberpaper/backlog/5lluHTIZAI8G2797TdEcsD).

- The [Angular Material demo site](https://material.angularjs.org/1.0.9/) provides examples of what we are trying to accomplish. Use version 1.0.9.

- Building the `ember-paper` demo application will give you your own up-to-date reference. This can be accomplished by installing ember-paper as if it were an application and running `ember server`.

- **Ready to help?** Read our [Contributing Guide](CONTRIBUTING.md).

## Contributing

This is a very ambitious project. Google's design specs are extensive, and non-trivial to implement. If you can port or fix a component or two, please drop a pull request or issue on GitHub or join us on slack.

With everyone's help, we can bring this amazing design spec to Ember in a modular and elegant way. The Ember way.
