var path = require('path');
var wallabyWebpack = require('wallaby-webpack');
var wallabyHelper = require('./@app/wallaby-helper');

var webpackPostprocessor = wallabyWebpack({});

module.exports = function(wallaby) {
  return {
    files: wallabyHelper.commonFileList.concat([
      {pattern: 'src/main/**/*.ts', load: false}
    ]),

    tests: [
      {pattern: 'src/spec/**/*Spec.ts', load: false}
    ],

    compilers: {
      '**/*.ts*': wallaby.compilers.typeScript({module: 'es2015'})
    },

    preprocessors: {
      '**/*.js*': file => wallabyHelper.babel(file)
    },

    postprocessor: webpackPostprocessor,

    testFramework: 'mocha',

    bootstrap: function() {
      window.assert = chai.assert;
      window.__moduleBundler.loadTests();
    }
  };
};
