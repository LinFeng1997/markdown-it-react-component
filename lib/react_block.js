// React block
// An array of opening and corresponding closing sequences for react jsx tags,
// last argument defines whether it can terminate a paragraph or not
//
import { REACT_TAG_RE } from './constans';

var REACT_SEQUENCES = [
  // PascalCase Components
  [REACT_TAG_RE, /^$/, true],
  [/^<([A-Z][A-Za-z0-9.]*)/, /^$/, true, (p1) => {
    return new RegExp(`<?\/(${p1})?>\\s*$`);
  }]
  // [ /^<![A-Z]/,     />/,     true ],
  // [ new RegExp('^</?(' + block_names.join('|') + ')(?=(\\s|/?>|$))', 'i'), /^$/, true ],
  // [ new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + '\\s*$'),  /^$/, false ]
];
var htmlReg = /<[a-z]+.*>/;

function getCloseTagReg(tag, regs) {
  let reg = null;
  if (tag && typeof regs[3] === 'function') {
    reg = regs[3](tag);
  }
  return reg;
}
function pushStack(stack,lineText) {
  let openTag = null;
  let i = 0;
  for (; i < REACT_SEQUENCES.length; i++) {
    const match = lineText.match(REACT_SEQUENCES[i][0]);
    openTag = match ? match[1] : null;
    const tagMatch = getCloseTagReg(openTag,REACT_SEQUENCES[i]);
    if (tagMatch) {
      const isInline = tagMatch.test(lineText);
      // <Timeline.Item>aaa</Timeline.Item>
      if (!isInline) {
        stack.push({type: 'open', str: lineText, tag: openTag});
      }
      break;
    }
  }
  return {openTag,i};
}
export default function react_block(state, startLine, endLine, silent) {
  var nextLine, token,
    pos = state.bMarks[startLine] + state.tShift[startLine],
    max = state.eMarks[startLine],
    stack = [];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  if (!state.md.options.html) { return false; }

  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

  let lineText = state.src.slice(pos, max);

  // 入栈第一处
  let {openTag, i} = pushStack(stack, lineText);

  if (i === REACT_SEQUENCES.length) { return false; }

  if (silent) {
    // true if this sequence can be a terminator, false otherwise
    return REACT_SEQUENCES[i][2];
  }

  nextLine = startLine + 1;

  const endReg = getCloseTagReg(openTag,REACT_SEQUENCES[i]) || REACT_SEQUENCES[i][1];
  // If we are here - we detected HTML block.
  // Let's roll down till block end.
  if (!endReg.test(lineText)) {
    let innerEndReg = endReg;
    for (; nextLine < endLine; nextLine++) {
      if (state.sCount[nextLine] < state.blkIndent) { break; }

      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      lineText = state.src.slice(pos, max);
      // 入栈第二处
      const {openTag: innerTag} = pushStack(stack, lineText);
      innerEndReg = getCloseTagReg(innerTag,REACT_SEQUENCES[i]) || innerEndReg;
      if(stack.length === 1){
        innerEndReg = endReg;
      }
      if ((innerEndReg.test(lineText)) && !htmlReg.test(lineText) && !innerTag) {
        // 出栈处,恢复现场
        stack.pop();
        if(stack.length === 0){
          if (lineText.length !== 0) { nextLine++; }
          break;
        }
      }
    }
  }

  state.line = nextLine;

  token         = state.push('react_block', '', 0);
  token.map     = [ startLine, nextLine ];
  token.content = state.getLines(startLine, nextLine, state.blkIndent, true);

  return true;
}
