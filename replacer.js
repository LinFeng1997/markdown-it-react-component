import * as babel from 'babel-standalone';
import ReactDOM from 'react-dom';
import React from 'react';

// use babel filter xss attack
babel.registerPlugin('filterXSS', filterXSS);
const babelTransformOptions = {
  presets: ['stage-3', 'react', 'es2015'],
  plugins: ['filterXSS']
};

function filterXSS() {
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

function transReactCode(code) {
  const rst = babel.transform(code, babelTransformOptions);

  return rst.code;
}

// 
export default function replacer({str, wrapperId, lang, components = {}}) {
  if (lang === 'mixin-react') {
    return replacerReact(str, wrapperId, components);
  }
  return str;
}

function replacerReact(code, wrapperId, components) {
  const reactCode = `function T(props) {
                    ${code}
                  }
                  ReactDOM.hydrate(T(),__container)
                  `;

  const rst = transReactCode(reactCode);
  setTimeout(renderReact.bind(null, wrapperId, rst, components), 0);
}

function renderReact(wrapperId, reactCode, components) {
  const __container = document.getElementById(wrapperId);
  if (!__container) {
    return;
  }
  const sandbox = {
    React,
    ReactDOM,
    ...components,
    __container,
  };
  const func = compileCode(reactCode);
  func(sandbox);
  // style resume
  __container.style.opacity = 1
}

function compileCode(code) {
  code = 'with (sandbox) {' + code + '}';
  const fn = new Function('sandbox', code);
  return (sandbox) => {
    const proxy = new Proxy(sandbox, {
      has() {
        return true; // 
      },
      get(target, key, receiver) {
        // 
        if (key === Symbol.unscopables) {
          return undefined;
        }
        return Reflect.get(target, key, receiver);
      }
    });
    return fn(proxy);
  };
}