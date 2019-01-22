'use strict';

const rsvp = require('rsvp');
const fs = require('fs-extra');
const path = require('path');
const writeFile = rsvp.denodeify(fs.writeFile);
const isModuleUnificationProject = require('../module-unification').isModuleUnificationProject;

module.exports = {
  description: 'Installs ember-cli-sass',

  normalizeEntityName() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },
  addAppScss() {
    let importStatement = '\n@import "ember-paper";\n';

    let stylePath = path.join('app', 'styles');

    if (isModuleUnificationProject(this.project)) {
      stylePath = path.join('src', 'ui', 'styles');
    }

    let file = path.join(stylePath, 'app.scss');

    if (!fs.existsSync(stylePath)) {
      fs.mkdirSync(stylePath);
    }
    if (fs.existsSync(file)) {
      return this.insertIntoFile(file, importStatement, {});
    } else {
      return writeFile(file, importStatement);
    }
  },

  afterInstall() {
    return this.addAddonToProject('ember-cli-sass', '^7.2.0').then(() => this.addAppScss());
  }
};
