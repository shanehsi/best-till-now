var wallabyWebpack = require('wallaby-webpack');
var wallabyHelper = require('./@app/wallaby-helper');

module.exports = function(wallaby) {

  var webpackPostprocessor = wallabyWebpack({
    // webpack options

    externals: {
      // Use external version of React instead of rebuilding it
      "react": "React"
    }
  });

  return {
    files: wallabyHelper.reactCommonFileList.concat([
      {pattern: 'src/main/components/**/*.tsx', load: false},
      '!src/main/components/**/__tests__/**/*.tsx'
    ]),

    tests: [
      {pattern: 'src/main/components/**/__tests__/**/*.tsx', load: false}
    ],

    compilers: {
      '**/*.ts*': wallaby.compilers.typeScript({module: 'es6', jsx: 'react'})
    },

    preprocessors: {
      '**/*.js*': file => wallabyHelper.babel(file)
    },

    testFramework: 'mocha',

    postprocessor: webpackPostprocessor,

    bootstrap: function() {
      window.assert = chai.assert;
      window.__moduleBundler.loadTests();
    }
  };
};
