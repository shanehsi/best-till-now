// chai 通过 <script> 引入, 并在 boostrap 时 将 chai.assert 放到 window 上
const commonFileList = [
  {pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false, load: true},
  {pattern: 'node_modules/chai/chai.js', instrument: false, load: true},
  {pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false, load: false}
];

const reactCommonFileList = commonFileList.concat([
  {pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false, load: true},
  {pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false, load: true}
]);

const babel = function(file) {
  // preprocessors 似乎会处理所有的 js, 不管是否 `instrument: false`. 这里手动排除掉.
  if (/\bchai.js|sinon.js|polyfill.js|react-with-addons\b/.test(file.path)) return file.content;
  return require('babel-core').transform(file.content, {
    sourceMap: true,
    presets: ['es2015'],
    "plugins": [
      "transform-async-to-generator"
    ]
  })
};

module.exports = {
  commonFileList: commonFileList,
  reactCommonFileList: reactCommonFileList,
  babel: babel
};
