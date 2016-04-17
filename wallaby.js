var path = require("path");
var wallabyWebpack = require("wallaby-webpack");

var webpackPostprocessor = wallabyWebpack({});

module.exports = function(wallaby) {
  return {
    files: [
      // chai 通过 <script> 引入, 并在 boostrap 时 将 chai.assert 放到 window 上
      {pattern: "node_modules/chai/chai.js", instrument: false, load: true},
      {pattern: "node_modules/sinon/pkg/sinon.js", instrument: false, load: false},
      {pattern: "src/browser/main/**/*.ts", load: false}
    ],

    tests: [
      {pattern: "src/browser/test/**/*Spec.ts", load: false}
    ],

    preprocessors: {
      "**/*.js*": file => {
        if (/\bchai.js|sinon.js\b/.test(file.path)) return file.content;
        return require("babel-core").transform(file.content, {
          sourceMap: true,
          presets: ["es2015"]
        })
      }
    },

    postprocessor: webpackPostprocessor,

    testFramework: "mocha",

    bootstrap: function() {
      window.assert = chai.assert;
      window.__moduleBundler.loadTests();
    }
  };
};
