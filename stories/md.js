import highlight from './highlight'
import MarkdownIt from 'markdown-it'
import * as Antd from 'antd/lib/index'
import CustomBtn from './custom-components/Button'
import { SupportReactComponent } from '../index'

export default new MarkdownIt({
  highlight,
  breaks: true,
  html: true,
  quotes: '“”‘’',
  langPrefix: 'lang-'
}).use(SupportReactComponent, {
  sandbox: {
    Antd,
    Custom: {
      Button: CustomBtn
    }
  },
})