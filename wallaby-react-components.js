var wallabyWebpack = require('wallaby-webpack');

module.exports = function(wallaby) {

  var webpackPostprocessor = wallabyWebpack({
    // webpack options

    externals: {
      // Use external version of React instead of rebuilding it
      "react": "React"
    }
  });

  return {
    files: [
      {pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false},
      {pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false, load: true},
      {pattern: 'node_modules/chai/chai.js', instrument: false, load: true},
      {pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false, load: false},
      {pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},
      {pattern: 'src/browser/main/components/**/*.tsx', load: false},
      '!src/browser/main/components/**/__tests__/**/*.tsx'
    ],
    tests: [
      {pattern: 'src/browser/main/components/**/__tests__/**/*.tsx', load: false}
    ],
    compilers: {
      '**/*.ts*': wallaby.compilers.typeScript({module: 'es6', jsx: 'react'})
    },
    preprocessors: {
      '**/*.js*': file => {
        if (/\bchai.js|sinon.js|polyfill.js\b/.test(file.path)) return file.content;
        return require('babel-core').transform(file.content, {
          sourceMap: true,
          presets: ['es2015']
        });
      }
    },
    testFramework: 'mocha',
    postprocessor: webpackPostprocessor,
    bootstrap: function() {
      window.assert = chai.assert;
      window.__moduleBundler.loadTests();
    }
  };
};
