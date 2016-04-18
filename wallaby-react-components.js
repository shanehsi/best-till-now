module.exports = function(wallaby) {

  return {
    files: [
      'src/browser/main/components/**/*.tsx',
      '!src/browser/main/components/**/__tests__/**/*.tsx'
    ],
    tests: [
      'src/browser/main/components/**/__tests__/**/*.tsx'
    ],
    compilers: {
      '**/*.ts*': wallaby.compilers.typeScript({module: 'es6', jsx: 'react'})
    },
    preprocessors: {
      '**/*.js*': file => require('babel-core').transform(file.content, {
        sourceMap: true,
        presets: ['es2015']
      })
    },
    env: {
      type: 'node'
    },
    testFramework: 'mocha',

    setup: function() {
      global.React = require('react');
      global.assert = require('chai').assert;

      // Taken from https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
      var jsdom = require('jsdom').jsdom;

      var exposedProperties = ['window', 'navigator', 'document'];

      global.document = jsdom('');
      global.window = document.defaultView;
      Object.keys(document.defaultView).forEach((property) => {
        if (typeof global[property] === 'undefined') {
          exposedProperties.push(property);
          global[property] = document.defaultView[property];
        }
      });

      global.navigator = {
        userAgent: 'node.js'
      };
    }
  };
};
