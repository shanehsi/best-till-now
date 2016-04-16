var path = require("path");
var wallabyWebpack = require("wallaby-webpack");

var webpackPostprocessor = wallabyWebpack({});

module.exports = function(wallaby) {
  return {
    files: [
      // 加载 expect 到 <script />, 不需要每次都用 import (webpack 的方式)
      {pattern: "node_modules/expect/umd/expect.min.js", instrument: false, load: true},
      {pattern: "src/browser/main/**/*.js", load: false}
    ],

    tests: [
      {pattern: "src/browser/test/**/*Spec.js", load: false}
    ],

    compilers: {
      "**/*.js": wallaby.compilers.babel()
    },

    postprocessor: webpackPostprocessor,

    testFramework: "mocha",

    bootstrap: function() {
      window.__moduleBundler.loadTests();
    }
  };
};
