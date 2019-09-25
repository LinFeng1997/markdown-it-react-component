import React from 'react';
import MarkdownIt from 'markdown-it';
import { SupportReactComponent } from '../index';
import { getResult, wrapperId,getSimpleInput,getSimpleResult } from './util';
import * as funcs from '../lib/func';

funcs.getWrapperId = () => wrapperId;
const Hello = (props) => <div>{props.text} world!</div>;
const md = new MarkdownIt({
  breaks: true,
  html: true
}).use(SupportReactComponent, {
  sandbox: {
    React,
    Array: {
      isArray: Array.isArray
    },
    Hello
  },
  allowErrorLog: true
});
/**
 * only require other specs here
 */
describe('markdown-it-react-component', () => {

  beforeAll(() => {
    window = undefined;
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('react code should be render', () => {
    const html = md.render(getSimpleInput('code'));
    expect(html).toBe(getResult('rc', '<div>hello world!</div>'));
  });

  it('react code include component which in sandbox should be render', () => {
    const html = md.render(getSimpleInput('component'));
    expect(html).toBe(getResult('rc', '<div>hello world!</div>'));
  });

  describe('react_inline', () => {
    it('react_inline code should be render', () => {
      const html = md.render(getSimpleInput('react_inline_code'));
      expect(html).toBe(getSimpleResult('<div>hello world!</div>'));
    });
  });

  describe('react_block', () => {
    it('react_block code should be render', () => {
      const html = md.render(getSimpleInput('react_block_code'));
      expect(html).toBe(getSimpleResult('<div>hello world!</div>'));
    });
  });
});
