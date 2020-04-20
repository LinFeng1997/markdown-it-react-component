const fs = require('fs');
const path = require('path');
export const wrapperId = 'wrapperId';
export const getResult = (klass = 'rc', html = '') => `<div class="${klass}" style="opacity: 0" id="${wrapperId}">${html}<p></p>\n</div>\n`;
export const getSimpleInput = (filename) => fs.readFileSync(path.resolve(__dirname,`./spec/${filename}.md`),'utf-8');
export const getSimpleResult = (html = '') => `<span style="opacity: 0" id="${wrapperId}">${html}</span>`;