import container from 'markdown-it-container/dist/markdown-it-container.min';
import Replacer from './lib/index';
import reactBlockRule from './lib/react_block';
import { react_inline } from './lib/react_inline';
import { getWrapperId } from './lib/func';

function renderSimpleComponent(replacer,content,env) {
  let wrapperId = getWrapperId();

  if (env && typeof env === 'object') {
    replacer.sandbox = {
      ...replacer.sandbox,
      ...env
    };
  }

  const code = `return (${content})`;
  try {
    return `<div style="opacity: 0" id="${wrapperId}">${replacer.getHtml(wrapperId, code,env)}</div>`;
  } catch (e) {
    console.error(e);
    return `<div style="opacity: 0" id="${wrapperId}"></div>`;
  }
}
export const SupportReactComponent = (md, options) => {
  md.use(...createContainer('rc', options, '`'));
  md.use(...createContainer('mixin-react', options, '`'));

  const replacer = new Replacer(options);

  // // react_block
  md.block.ruler.before('html_block','react_block',reactBlockRule,[ 'paragraph', 'reference', 'blockquote' ]);
  md.renderer.rules.react_block = function (tokens, idx,options, env) {
    return renderSimpleComponent(replacer,tokens[idx].content,env);
  };

  // // react_inline
  md.inline.ruler.before('html_inline','react_inline',react_inline);
  md.renderer.rules.react_inline = function (tokens, idx,options, env) {
    return renderSimpleComponent(replacer,tokens[idx].content,env);
  };
};

function createContainer (klass, options, marker = ':') {
  const replacer = new Replacer(options);
  return [container, klass, {
    render (tokens, idx,_options,env) {
      const token = tokens[idx];
      // const info = token.info.trim().slice(klass.length).trim();
      if (token.nesting === 1) {
        if (env && typeof env === 'object') {
          replacer.sandbox = {
            ...replacer.sandbox,
            ...env
          };
        }

        let wrapperId = getWrapperId();

        try {
          const offset = tokens.slice(idx).findIndex(token => token.type === `container_${klass}_close`);
          let str = tokens.slice(idx,idx + offset).reduce((pre,cur)=>{
            const str = pre + '\n' + cur.content;
            // reset token
            cur.content = '';
            cur.children = [];
            return str;
          },'');
          const html = replacer.getHtml(wrapperId, str,env);
          return `<div class="${klass}" style="opacity: 0" id="${wrapperId}">${html}`;
        } catch (e) {
          if (options && options.allowErrorLog) console.log(e);
          return `<div class="${klass}" style="opacity: 0" id="${wrapperId}">`;
        }
      } else {
        return '</div>\n';
      }
    },
    marker
  }];
}