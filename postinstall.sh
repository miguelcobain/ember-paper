#!/bin/sh

echo "postinstall..."

echo "installing bower dependendies"
npm install bower
./node_modules/.bin/bower install

echo "installing node-sass"
npm install node-sass

echo "compiling CSS to /vendor with node-sass"
./node_modules/.bin/node-sass ./addon/styles/scss/main.scss ./vendor/ember-paper.css

echo "install autoprefixer"
npm install autoprefixer

echo "autoprefixing"
./node_modules/autoprefixer/autoprefixer -b "last 2 versions" ./vendor/ember-paper.css
