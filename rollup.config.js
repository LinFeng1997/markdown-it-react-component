// rollup.config.js
import babel from 'rollup-plugin-babel';
export default {
  input: 'index.js',
  output: [{
    file: 'dist/index.js',
    name: 'replacer',
    format: 'umd'
  }, {
    file: 'dist/es/index.js',
    format: 'esm'
  }],
  plugins: [
    babel({
      exclude: 'node_modules/**' // 仅仅转译我们的源码
    })
  ],
};