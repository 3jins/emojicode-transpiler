import match from '../match';
import convertKeywords from './convertKeywords';
import convertSeparatedKeywords from './convertSeparatedKeywords';

export default (token) => {
  const { type, content } = token;
  if (type === 'comment' || type === 'identifier') return content;
  if (type === 'string') {
    const {
      gfm,
      traditional,
      escapeSequence,
    } = match;
    const escapeSequenceObject = escapeSequence.reduce((obj, keyword) => {
      if (keyword in gfm) obj[keyword] = gfm[keyword];
      else if (keyword in gfm) obj[keyword] = traditional[keyword];
      return obj;
    }, {});
    return convertKeywords(content, escapeSequenceObject);
  }
  if (type === 'rest') {
    const {
      gfm,
      traditional,
    } = match;
    return convertSeparatedKeywords(convertKeywords(content, gfm), traditional);
  }
  console.error('There was an error in parsing');
  return '';
};
