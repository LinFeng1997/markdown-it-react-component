export const wrapperId = 'wrapperId';
export const getResult = (klass = 'rc', html = '') => `<div class="${klass}" style="opacity: 0" id="${wrapperId}">${html}<p></p>\n</div>\n`;