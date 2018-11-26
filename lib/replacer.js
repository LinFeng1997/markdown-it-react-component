import { replacerReact } from './util'

// Todo:babel options
export default function replacer ({str, wrapperId, lang, components = {}}) {
  console.log(1)
  if (lang === 'mixin-react') {
    console.log(2)
    return replacerReact(str, wrapperId, components)
  }
  return str
}

