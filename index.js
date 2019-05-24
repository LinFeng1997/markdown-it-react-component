import container from 'markdown-it-container/dist/markdown-it-container.min';
import Replacer from './lib/index';

export const SupportReactComponent = (md, options) => {
  md.use(...createContainer('rc', options, '`'));
  md.use(...createContainer('mixin-react', options, '`'));
};

function createContainer (klass, options, marker = ':') {
  const replacer = new Replacer(options);
  return [container, klass, {
    render (tokens, idx,_options,env) {
      const token = tokens[idx];
      // const info = token.info.trim().slice(klass.length).trim();
      if (token.nesting === 1) {
        if (typeof env.mdRefs === 'object' && typeof replacer.sandbox === 'object') {
          replacer.sandbox.mdRefs = env.mdRefs;
        }
        let wrapperId = 'rc' + Math.random().toString(36).substr(2, 10);

        try {
          const offset = tokens.slice(idx).findIndex(token => token.type === `container_${klass}_close`);
          let str = tokens.slice(idx,idx + offset).reduce((pre,cur)=>{
            return pre + '\n' + cur.content;
          },'');
          const html = replacer.getHtml(wrapperId, str);
          return `<div class="${klass}" style="opacity: 0" id="${wrapperId}">${html}`;
        } catch (e) {
          return `<div class="${klass}" style="opacity: 0" id="${wrapperId}">`;
        }
      } else {
        return '</div>\n';
      }
    },
    marker
  }];
}