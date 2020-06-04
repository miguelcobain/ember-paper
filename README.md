# Ember Paper [![Build Status](https://travis-ci.org/miguelcobain/ember-paper.svg)](https://travis-ci.org/miguelcobain/ember-paper) [![Ember Observer Score](http://emberobserver.com/badges/ember-paper.svg)](http://emberobserver.com/addons/ember-paper) [![Discord](https://img.shields.io/discord/480462759797063690.svg?logo=discord)](https://discord.gg/zT3asNS)

This project aims to bring Google's new [Material Design](https://www.google.com/design/spec/material-design/introduction.html) to Ember. The goal is to encapsulate everything possible in Ember components. This project is packaged as an [Ember-cli](http://www.ember-cli.com/) addon.

[Explore Ember Paper docs »](https://miguelcobain.github.io/ember-paper/)

## Installation

Install the ember-cli addon in your ember-cli project:

```
$ ember install ember-paper
```

This should also automatically create an scss file under `app/styles/app.scss` with `@import 'ember-paper';` and install `ember-cli-sass`.

Sass is an important part of Ember-paper. Using sass you can override default variables and easily change the default behavior of ember-paper styles.

All the components and styles are ready to use in your application templates.
Navigate through the docs to understand how to use each component.

# Content Security Policy

This is no longer used in newer ember-cli apps. However, here are the instructions if you need them. Ember Paper uses fonts from Google Fonts, so the URL to them has to be white listed. You can set this by adding to the Content Security Policy defined in config/environment.js like so:

```js
ENV.contentSecurityPolicy = {
  'default-src': "'none'",
  'script-src': "'self' 'unsafe-inline'",
  'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
  'font-src': "'self' fonts.gstatic.com",
  'connect-src': "'self'",
  'img-src': "'self' data:",
  'media-src': "'self'"
};
```

You can find out more information on the CSP addon page here. We also need to allow data: in img-src because of a current hack in paper-button styles.

# Options

Ember-paper supports the following options, specified in your ember-cli-build.js file:

```
ENV['autoprefixer'] (defaults to { browsers: ['last 2 versions'] })
```

By default ember-paper will run autoprefixer on your styles. This option allows you to override the default autoprefixer target.

```
ENV['ember-paper'].insertFontLinks (defaults to true)
```

Consuming apps can specify this option to prevent the insertion of google fonts links inside the head tag. This is especially useful if you want to include your own fonts.

```
ENV['ember-paper'].whitelist (defaults to [])
```

Consuming apps can optionally specify this array to only include these components into the build. You should use either whitelist or blacklist, not both.

```js
ENV['ember-paper'] = {
    whitelist: [
        'paper-card',
        'paper-tooltip',
        'paper-button'
    ]
};
```

The dependencies of the specified components will be included as well. This is the recommended approach, blacklist is harder to get right.

```
ENV['ember-paper'].blacklist (defaults to [])
```

Consuming apps can optionally specify this array to exclude these components from the build.

```
ENV['ember-paper'] = {
    blacklist: [
        'paper-card',
        'paper-item'
    ]
};
```

This only bans from the build the specified components, not its dependencies. whitelist is easier to maintain.

## Resources

- Contributors can often be found on the [#e-paper channel on discord](https://discord.gg/zT3asNS).

- The [GitHub milestone issue](https://github.com/miguelcobain/ember-paper/issues/249) tracks our progress to version 1.0.

- Building the `ember-paper` demo application will give you your own up-to-date reference. This can be accomplished by cloning ember-paper as if it were an application and running `ember server`.

## Contributing

This is an ambitious project. Google's design specs are extensive, and non-trivial to implement. If you can port or fix a component or two, please drop a pull request or issue on GitHub or join us on Discord.

With everyone's help, we can bring this amazing design spec to Ember in a modular and elegant way. The Ember way.

## License

This project is licensed under the [MIT License](LICENSE.md).
