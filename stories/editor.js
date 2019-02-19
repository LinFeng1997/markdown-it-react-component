import React, { PureComponent } from 'react';
import TuiEditor from 'tui-editor/dist/tui-editor-Editor.min';
import 'tui-editor/dist/tui-editor.min.css';
import 'tui-editor/dist/tui-editor-contents.min.css';
import 'codemirror/lib/codemirror.css';
import md from './md';

TuiEditor.markdownitHighlight.use(old => {
  for (let key in old){
    old[key] = md[key];
  }
  return md;
});
export default class MarkdownEditor extends PureComponent {
  componentDidMount(){
    const editor = new TuiEditor({
      el: document.getElementById('editor'),
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: '500px'
    });
    editor.setValue(this.props.markdown);
  }
  render(){
    return <div id="editor"></div>;
  }
}