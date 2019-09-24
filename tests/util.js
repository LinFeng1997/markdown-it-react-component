export const wrapperId = 'wrapperId';
export const getResult = (klass = 'rc', html = '') => `<div class="${klass}" style="opacity: 0" id="${wrapperId}">${html}<p></p>\n</div>\n`;
export const getSimpleResult = (html = '') => `<div style="opacity: 0" id="${wrapperId}">${html}</div>`;