export const babelTransformOptions = {
  presets: ['stage-3', 'react', 'es2015'],
  plugins: ['filterXSS']
};

var attr_name     = '[a-zA-Z_:][a-zA-Z0-9:._-]*';
var unquoted      = '[^"\'=<>`\\x00-\\x20]+';
var single_quoted = "'[^']*'";
var double_quoted = '"[^"]*"';

var attr_value  = '(?:' + unquoted + '|' + single_quoted + '|' + double_quoted + ')';
var attribute   = '(?:\\s+' + attr_name + '(?:\\s*=\\s*' + attr_value + ')?)';
var open_tag    = '<[A-Z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/>';

// var close_tag   = '<\\/[A-Z][A-Za-z0-9\\-]*\\s*>';

export const REACT_TAG_RE = new RegExp('^(?:' + open_tag + ')');