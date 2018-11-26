import React from 'react'
import ReactDOM from 'react-dom'
import { babelTransformOptions, filterXSS } from './constans'
import * as babel from 'babel-standalone'

// use babel filter xss attack
babel.registerPlugin('filterXSS', filterXSS)

function transReactCode (code, babelOptions = {}) {
  const rst = babel.transform(code, {...babelTransformOptions, ...babelOptions})

  return rst.code
}

export function replacerReact (code, wrapperId, components, babelOptions) {
  const reactCode = `function T(props) {
                    ${code}
                  }
                  ReactDOM.hydrate(T(),__container)
                  `

  const rst = transReactCode(reactCode, babelOptions)
  setTimeout(renderReact.bind(null, wrapperId, rst, components), 0)
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

export function compileCode (code) {
  code = 'with (sandbox) {' + code + '}'
  const fn = new Function('sandbox', code)
  return (sandbox) => {
    const proxy = new Proxy(sandbox, {
      has () {
        return true //
      },
      get (target, key, receiver) {
        //
        if (key === Symbol.unscopables) {
          return undefined
        }
        return Reflect.get(target, key, receiver)
      }
    })
    return fn(proxy)
  }
}