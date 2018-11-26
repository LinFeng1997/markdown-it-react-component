export const babelTransformOptions = {
  presets: ['stage-3', 'react', 'es2015'],
  plugins: ['filterXSS']
};

export function filterXSS() {
  return {
    visitor: {
      Identifier(path) {
        if (path.isIdentifier({name: 'constructor'})) {
          console.log('XSS Attack~');
          path.node.name = 'x';
        }
      }
    }
  };
}