import React from 'react';
import { storiesOf } from '@storybook/react';
import md from './md';

import str from './markdown/base.md';
import antdStr from './markdown/antd.md';
import simpleStr from './markdown/simple.md';
import 'antd/dist/antd.min.css';
import './github-markdown.css';
import 'highlight.js/styles/github.css';
import 'antd/es/button/style/index.css';
import './index.css';

import MarkdownEditor from './editor';

// console.log('parse',md.parse(simpleStr))
storiesOf('mixin-react', module)
  .add('base', () => (
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: md.render(str) }}/>
  ))
  .add('antd', () => (
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: md.render(antdStr) }}/>
  ))
  .add('simple', () => (
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: md.render(simpleStr) }}/>
  ))
  .add('editor',() => (
    <MarkdownEditor markdown={antdStr}/>
  ));