(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('babel-standalone'), require('react-dom'), require('react'), require('markdown-it-container')) :
  typeof define === 'function' && define.amd ? define(['exports', 'babel-standalone', 'react-dom', 'react', 'markdown-it-container'], factory) :
  (factory((global.myBundle = {}),global.babel,global.ReactDOM,global.React,global.container));
}(this, (function (exports,babel,ReactDOM,React,container) { 'use strict';

  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;
  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  container = container && container.hasOwnProperty('default') ? container['default'] : container;

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
  function replacer({str, wrapperId, lang, components = {}}) {
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
    __container.style.opacity = 1;
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

  const SupportReactComponent = (md, options) => {
    md.use(...createContainer('rc', options));
  };

  function createContainer(klass, options) {
    return [container, klass, {
      render(tokens, idx) {
        const token = tokens[idx];
        const info = token.info.trim().slice(klass.length).trim();
        if (token.nesting === 1) {
          let wrapperId = 'rc' + Math.random().toString(36).substr(2, 10);
          setTimeout(() => {
            replaceReactCode(wrapperId, options);
          }, 0);
          return `<div class="${klass} minxin-react" style="opacity: 0" id="${wrapperId}">${info}`
        } else {
          return `</div>\n`
        }
      }
    }]
  }

  function replaceReactCode(wrapperId, options = {}) {
    const container$$1 = document.querySelector(`#${wrapperId} p`);
    const str = container$$1.innerText;
    replacer({
      str,
      wrapperId,
      lang: 'mixin-react',
      components: options.components
    });
  }

  exports.SupportReactComponent = SupportReactComponent;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
