import React from 'react';
import { storiesOf } from '@storybook/react';
import MarkdownIt from 'markdown-it';
import { SupportReactComponent } from '../index';
import str from './markdown/base.md';
import antdStr from './markdown/antd.md';
import Button from "antd/es/button";
import 'antd/es/button/style/index.css';

const md = new MarkdownIt().use(SupportReactComponent,{
  sandbox: {
    Antd: {
      Button
    }
  },
});
storiesOf('minxin-react', module)
  .add('base', () => (
    <div dangerouslySetInnerHTML={{ __html: md.render(str) }}/>
  ))
  .add('antd', () => (
    <div dangerouslySetInnerHTML={{ __html: md.render(antdStr) }}/>
  ));