import container from 'markdown-it-container'
import replacer from './lib/replacer'

export const SupportReactComponent = (md, options) => {
  md.use(...createContainer('rc', options))
  md.use(...createContainer('rc', options, '`'))
}

function createContainer (klass, options, marker = ':') {
  return [container, klass, {
    render (tokens, idx) {
      const token = tokens[idx]
      const info = token.info.trim().slice(klass.length).trim()
      if (token.nesting === 1) {
        let wrapperId = 'rc' + Math.random().toString(36).substr(2, 10)
        setTimeout(() => {
          replaceReactCode(wrapperId, options)
        }, 0)
        return `<div class="${klass} minxin-react" style="opacity: 0" id="${wrapperId}">${info}`
      } else {
        return `</div>\n`
      }
    },
    marker
  }]
}

function replaceReactCode (wrapperId, options = {}) {
  const container = document.querySelector(`#${wrapperId} p`)
  const str = container.innerText
  replacer({
    str,
    wrapperId,
    lang: 'mixin-react',
    components: options.components,
    babelOptions: options.babelOptions
  })
}