var path = require('path');
var wallabyWebpack = require('wallaby-webpack');

var webpackPostprocessor = wallabyWebpack({});

module.exports = function(wallaby) {
  return {
    files: [
      {pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false, load: true},
      // chai 通过 <script> 引入, 并在 boostrap 时 将 chai.assert 放到 window 上
      {pattern: 'node_modules/chai/chai.js', instrument: false, load: true},
      {pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false, load: false},
      {pattern: 'src/main/**/*.ts', load: false}
    ],

    tests: [
      {pattern: 'src/spec/**/*Spec.ts', load: false}
    ],

    compilers: {
      '**/*.ts*': wallaby.compilers.typeScript({module: 'es2015'})
    },

    preprocessors: {
      '**/*.js*': file => {
        // preprocessors 似乎会处理所有的 js, 不管是否 `instrument: false`. 这里手动排除掉.
        if (/\bchai.js|sinon.js|babel-polyfill\/dist\/polyfill.js\b/.test(file.path)) return file.content;
        return require('babel-core').transform(file.content, {
          sourceMap: true,
          presets: ['es2015'],
          "plugins": [
            "transform-async-to-generator"
          ]
        })
      }
    },

    postprocessor: webpackPostprocessor,

    testFramework: 'mocha',

    bootstrap: function() {
      window.assert = chai.assert;
      window.__moduleBundler.loadTests();
    }
  };
};
