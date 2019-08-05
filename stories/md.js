import highlight from './highlight';
import MarkdownIt from 'markdown-it';
import * as Antd from 'antd/lib/index';
import { SupportReactComponent } from '../index';
import React from 'react';

export default new MarkdownIt({
  highlight,
  breaks: true,
  html: true,
  quotes: '“”‘’',
  langPrefix: 'lang-'
}).use(SupportReactComponent, {
  sandbox: {
    Antd,
    ...Antd,
    React,
    Array: {
      isArray: Array.isArray
    }
  },
  allowErrorLog: true
});