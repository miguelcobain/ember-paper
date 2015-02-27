# Ember Paper

[![Join the chat at https://gitter.im/miguelcobain/ember-paper](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/miguelcobain/ember-paper?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This project aims to bring Google's new [Material Design](https://www.google.com/design/spec/material-design/introduction.html) to Ember. The goal is to encapsulate everything possible in Ember components. This project is packaged as an [Ember-cli](http://www.ember-cli.com/) addon.

## Installation

Install the ember-cli addon in your ember-cli project:

```
$ ember install:addon ember-paper
```

All the components and styles are ready to use in your application templates.
Navigate through the docs to understand how to use each component.

We currently need to manually install these packages
```
$ npm install --save-dev broccoli-sass
$ npm install --save-dev broccoli-autoprefixer
```
and then create a file in `app/styles/app.scss`.

This is a known issue and a temporary fix. When we fix it, we remove this note.

## Contribution

This is a very ambitious project. Google's design specs are extensive, and not trivial to implement. `ember-paper` is heavily based on [Angular Material](https://github.com/angular/material) and [Web Starter Kit (material-sprint branch)](https://github.com/google/web-starter-kit/tree/material-sprint). These seem to be the most useful resources at the moment. If you feel like porting or fixing an element or two, please drop a pull request or issue at GitHub!


I believe that with the help of everyone we can bring these amazing design spec to Ember in a modular and robust way. The Ember way. **Help us on Github!**
