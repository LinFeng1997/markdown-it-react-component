import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import * as babel from 'babel-standalone';
import { babelTransformOptions } from './constans';
import { compileCode, filterXSS,renderReact } from './func';

const NOOP = () => {
};
export default class Replacer {
  constructor(options = {}) {
    if (options.sandbox && typeof options.sandbox !== 'object') {
      throw Error('sandbox must be object!');
    }
    if (options.babelInit && typeof options.babelInit !== 'function') {
      throw Error('babelInit must be function!');
    }
    this._init(options);
  }

  _init({
    babelInit = NOOP,
    sandbox = {},
    babelOptions,
    enableSSR = true
  }) {
    babel.registerPlugin('filterXSS', filterXSS);
    babelInit(babel);
    this.babel = babel;
    this.babelOptions = {
      ...babelTransformOptions,
      ...babelOptions
    };
    this.sandbox = {
      React,
      ReactDOM,
      NULL: Object.create(null),
      ReactDOMServer,
      ...sandbox
    };
    this.enableSSR = enableSSR;
  }

  _replace({
    str,
    wrapperId,
    lang,
  }) {
    if (lang === 'mixin-react') {
      return this._replacerReact(str, wrapperId);
    }
    return str;
  }

  // get html of react code
  _replacerReact(code, wrapperId) {
    const reactCode = `function YMGGKLK(props) { ${code} }
                  ReactDOM.hydrate(YMGGKLK.call(NULL),__container)
                  `;

    const finalCode  = this._transReactCode(reactCode);
    const html = this.enableSSR ? this._codeToHtml(wrapperId, code) : '<div></div>';

    setTimeout(renderReact.bind(null, wrapperId, finalCode, this.sandbox), 0);

    return html;
  }

  // pre-render HTML
  _codeToHtml(wrapperId, code) {
    const reactCode = `function YMGGKLK(props) { ${code} }
                  Html["${wrapperId}"] = ReactDOMServer.renderToStaticMarkup(YMGGKLK.call(NULL))
                  `;
    const Html = {};
    const newSandbox = {
      ...this.sandbox,
      Html
    };
    const func = compileCode(this._transReactCode(reactCode));
    func(newSandbox);
    return Html[wrapperId];
  }

  // use babel translation react code
  _transReactCode(code) {
    const rst = this.babel.transform(code, this.babelOptions);

    return rst.code;
  }

  getHtml(wrapperId,str,lang = 'mixin-react') {
    const html = this._replace({
      str,
      wrapperId,
      lang,
    });
    return html;
  }
}