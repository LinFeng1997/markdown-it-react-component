// rollup.config.js
export default {
  input: 'index.js',
  output: [{
    file: 'dist/index.js',
    name: 'replacer',
    format: 'umd'
  }, {
    file: 'dist/es/index.js',
    format: 'esm'
  }]
};