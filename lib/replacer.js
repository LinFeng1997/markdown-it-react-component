import { replacerReact } from './util'

export default function replacer ({str, wrapperId, lang, components = {}, babelOptions}) {
  if (lang === 'mixin-react') {
    return replacerReact(str, wrapperId, components, babelOptions)
  }
  return str
}

