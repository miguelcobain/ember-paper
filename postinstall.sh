#!/bin/sh

echo "postinstall..."

echo "installing bower dependendies"
npm install bower
./node_modules/.bin/bower install

echo "installing node-sass"
npm install node-sass autoprefixer

echo "compiling CSS to /vendor with node-sass"
./node_modules/.bin/node-sass ./addon/styles/scss/main.scss ./vendor/ember-paper.css

echo "applying autoprefixer to /vendor/ember-paper.css"
./node_modules/.bin/autoprefixer -b 'last 2 versions' ./vendor/ember-paper.css
