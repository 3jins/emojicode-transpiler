import _ from 'lodash';
import match from '../match';

const { separators } = match;

export default (str, keywordObj) => {
  let convertedStr = str;
  let strLen = convertedStr.length;
  let lastCursor = -1;
  let cursor = 0;
  while (cursor <= strLen) {
    if (cursor === strLen || separators.includes(convertedStr[cursor])) {
      const keywordCandidate = convertedStr.slice(lastCursor + 1, cursor);
      lastCursor = cursor;
      if (separators.includes(keywordCandidate)) continue; // eslint-disable-line no-continue
      _.some(keywordObj, (emoji, keyword) => {
        if (keywordCandidate === keyword) {
          const cursorShift = emoji.length - keywordCandidate.length;
          convertedStr = convertedStr.replace(keywordCandidate, emoji);
          strLen = convertedStr.length;
          cursor += cursorShift;
          lastCursor = cursor;
          return true;
        }
        return false;
      });
    }
    cursor += 1;
  }
  return convertedStr;
};
