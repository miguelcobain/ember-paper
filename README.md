# Ember Paper [![Build Status](https://travis-ci.org/miguelcobain/ember-paper.svg)](https://travis-ci.org/miguelcobain/ember-paper) [![Ember Observer Score](http://emberobserver.com/badges/ember-paper.svg)](http://emberobserver.com/addons/ember-paper) [![Slack Status](https://ember-community-slackin.herokuapp.com/badge.svg)](https://ember-community-slackin.herokuapp.com/)

This project aims to bring Google's new [Material Design](https://www.google.com/design/spec/material-design/introduction.html) to Ember. The goal is to encapsulate everything possible in Ember components. This project is packaged as an [Ember-cli](http://www.ember-cli.com/) addon.

## Installation

Install the ember-cli addon in your ember-cli project:

```
$ ember install ember-paper
```

This should also automatically create an scss file under `app/styles/app.scss` with `@import 'ember-paper';` and install `ember-cli-sass`.

Sass is an important part of Ember-paper. Using sass you can override default variables and easily change the default behavior of ember-paper styles.

All the components and styles are ready to use in your application templates.
Navigate through the docs to understand how to use each component.

## Resources

- The team can often be found on the [#e-paper channel on slack](https://embercommunity.slack.com/messages/e-paper/). Features and designs are discussed there prior to implementation. Get your invite to Ember Community Slack [here](https://ember-community-slackin.herokuapp.com/).

- The [GitHub milestone issue](https://github.com/miguelcobain/ember-paper/issues/249) tracks our progress to version 1.0.

- Building the `ember-paper` demo application will give you your own up-to-date reference. This can be accomplished by installing ember-paper as if it were an application and running `ember server`.

- **Ready to help?** Read our [Contributing Guide](CONTRIBUTING.md).

## Contributing

This is a very ambitious project. Google's design specs are extensive, and non-trivial to implement. If you can port or fix a component or two, please drop a pull request or issue on GitHub or join us on slack.

With everyone's help, we can bring this amazing design spec to Ember in a modular and elegant way. The Ember way.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
