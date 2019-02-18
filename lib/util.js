import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server';
import { babelTransformOptions } from './constans'
import { filterXSS,compileCode } from './func'
import * as babel from 'babel-standalone'

// use babel filter xss attack
babel.registerPlugin('filterXSS', filterXSS)

function transReactCode (code, babelOptions = {}) {
  const rst = babel.transform(code, {...babelTransformOptions, ...babelOptions})

  return rst.code
}

export function replacerReact (code, wrapperId, components, babelOptions) {
  const reactCode = `function YMGGKLK(props) { ${code} }
                  ReactDOM.hydrate(YMGGKLK.call(NULL),__container)
                  `;

  const finalCode = transReactCode(reactCode, babelOptions)
  const html = codeToHtml(wrapperId, code,components);

  setTimeout(renderReact.bind(null, wrapperId, finalCode, components), 0)

  return html
}

// pre-render HTML
function codeToHtml(wrapperId, code,components) {
  const reactCode = `function YMGGKLK(props) { ${code} }
                  Html["${wrapperId}"] = ReactDOMServer.renderToStaticMarkup(YMGGKLK.call(NULL))
                  `;
  const Html = {};
  const newSandbox = {
    ...components,
    React,
    ReactDOMServer,
    Html
  };
  const func = compileCode(transReactCode(reactCode));
  func(newSandbox);
  return Html[wrapperId];
}

export function renderReact (wrapperId, reactCode, components) {
  const __container = document.getElementById(wrapperId)
  if (!__container) {
    return
  }
  const sandbox = {
    React,
    ReactDOM,
    ...components,
    __container,
  }
  const func = compileCode(reactCode)
  func(sandbox)
  // style resume
  __container.style.opacity = 1
}