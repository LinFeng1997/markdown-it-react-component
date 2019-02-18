import container from 'markdown-it-container';
import replacer from './lib/replacer';

export const SupportReactComponent = (md, options) => {
  md.use(...createContainer('rc', options, '`'));
  md.use(...createContainer('mixin-react', options, '`'));
};

function createContainer (klass, options, marker = ':') {
  return [container, klass, {
    render (tokens, idx) {
      const token = tokens[idx];
      const info = token.info.trim().slice(klass.length).trim();
      if (token.nesting === 1) {
        let wrapperId = 'rc' + Math.random().toString(36).substr(2, 10);
        let str = tokens[idx + 2] && tokens[idx + 2].content;
        const html = replaceReactCode(wrapperId, str,options);
        return `<div class="${klass} minxin-react" style="opacity: 0" id="${wrapperId}">${html}`;
      } else {
        return '</div>\n';
      }
    },
    marker
  }];
}

function replaceReactCode (wrapperId,str, options = {}) {
  const html = replacer({
    str,
    wrapperId,
    lang: 'mixin-react',
    components: options.components,
    babelOptions: options.babelOptions
  });
  return html;
}