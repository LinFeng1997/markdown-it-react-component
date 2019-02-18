import hljs from 'highlight.js';

export default function highlight (str, lang) {
  let html = hljs.getLanguage(lang) ? hljs.highlight(lang, str).value : escape(str, false);
  // return html;
  return `<pre class="${lang}"><code class="language-${lang}">${html}</code></pre>`;
}

/**
 * escape code from markdown-it
 * @param {string} html HTML string
 * @param {string} encode Boolean value of whether encode or not
 * @returns {string}
 * @ignore
 */
function escape(html, encode) {
  return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}