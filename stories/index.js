import React from 'react';
import { storiesOf } from '@storybook/react';
import MarkdownIt from 'markdown-it';
import { SupportReactComponent } from '../index';
import str from './markdown/base.md';

const md = new MarkdownIt().use(SupportReactComponent);
const html = md.render(str);
storiesOf('minxin-react', module)
  .add('base', () => (
    <div dangerouslySetInnerHTML={{ __html: html }}/>
  ));