import highlight from './highlight';
import MarkdownIt from 'markdown-it';
import * as Antd from 'antd/lib/index';
import { SupportReactComponent } from '../index';

export default new MarkdownIt({ highlight }).use(SupportReactComponent,{
  sandbox: {
    Antd
  },
});