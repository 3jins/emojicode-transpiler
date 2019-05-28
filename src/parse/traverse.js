import _ from 'lodash';
import match from '../match';

export default (matchToken, codeFragment) => {
  const { separators, boundary } = match;
  const boundaryTokens = Object.keys(boundary);

  const getEndingTokens = (matchToken) => {
    if (!matchToken) return boundaryTokens;
    const { endingToken } = boundary[matchToken];
    if (endingToken === 'anything') return separators.concat(boundaryTokens);
    return [endingToken];
  };

  const warnWhenSeparatorsGetLonger = (functionName) => {
    separators.forEach((separator) => {
      if (separator.length > 1) {
        console.warn(`[!] A separator ${separator}'s length is longer than 1. The logic of ${functionName} should be updated.`);
      }
    });
  };

  // TODO: Rename it...
  // ex) if input is 'ab  \t cd   e', it returns ((2 + 1 + 1) - 1) + (3 - 1) = 5
  const getSeparatorContinuity = (str) => {
    warnWhenSeparatorsGetLonger(getSeparatorContinuity.name);
    let cursor = 0;
    let continuity = 0;
    let counting = false;
    const strLen = str.length;
    while (cursor < strLen) {
      if (separators.includes(str[cursor])) {
        if (counting) continuity += 1;
        else counting = true;
      } else {
        counting = false;
      }
      cursor += 1;
    }
    return continuity;
  };

  const trimContinuousSeparators = (str) => {
    warnWhenSeparatorsGetLonger(getSeparatorContinuity.name);
    let trimmedStr = '';
    let cursor = 0;
    let pass = false;
    const strLen = str.length;
    while (cursor < strLen) {
      if (!pass) trimmedStr += str[cursor];
      pass = separators.includes(str[cursor]);
      cursor += 1;
    }
    return trimmedStr;
  };

  const endingTokens = getEndingTokens(matchToken);
  const codeLength = codeFragment.length;
  let cursor = -1;

  while (cursor < codeLength) {
    cursor += 1;
    const matched = [];
    endingTokens.forEach((endingToken) => {
      // Deal with whitespace(separator)s
      const eachEndingTokens = endingToken.split(' ');
      const tokenLengthEstimated = eachEndingTokens
        .reduce((sum, eachEndingToken) => sum + eachEndingToken.length, 0)
          + eachEndingTokens.length
          - 1;
      let tokenCandidate = codeFragment.slice(cursor, cursor + tokenLengthEstimated);
      let separatorContinuity = getSeparatorContinuity(tokenCandidate);
      let lastSeparatorContinuity = separatorContinuity;
      while (lastSeparatorContinuity < separatorContinuity) {
        tokenCandidate = codeFragment
          .slice(cursor, cursor + tokenLengthEstimated + lastSeparatorContinuity);
        separatorContinuity = getSeparatorContinuity(tokenCandidate);
        lastSeparatorContinuity = separatorContinuity;
      }
      tokenCandidate = trimContinuousSeparators(tokenCandidate);
      // Add found tokens to an array matched.
      if (tokenCandidate === endingToken) matched.push(endingToken);
    });
    if (matched.length >= 1) {
      return {
        boundaryTokenLocation: cursor,
        boundaryToken: _.orderBy(matched, token => token.length, ['desc'])[0], // Get the longest token
      };
    }
  }
  return {
    boundaryTokenLocation: cursor,
    boundaryToken: '',
  };
};
