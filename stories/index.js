import React from 'react';
import { storiesOf } from '@storybook/react';
import MarkdownIt from 'markdown-it';
import { SupportReactComponent } from '../index';
import highlight from './highlight';

import str from './markdown/base.md';
import antdStr from './markdown/antd.md';
import * as Antd from 'antd';
import 'antd/dist/antd.min.css';
import './github-markdown.css';
import 'highlight.js/styles/github.css';
import 'antd/es/button/style/index.css';
import './index.css';

const md = new MarkdownIt({ highlight }).use(SupportReactComponent,{
  sandbox: {
    Antd
  },
});
storiesOf('minxin-react', module)
  .add('base', () => (
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: md.render(str) }}/>
  ))
  .add('antd', () => (
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: md.render(antdStr) }}/>
  ));