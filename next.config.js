// next.config.js
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');

module.exports = withTypescript(
  withCSS(
    withSass({
      webpack(config, options) {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
        // Further custom configuration here
        //config.target = 'node';
        return config;
      }
    })
  )
);
