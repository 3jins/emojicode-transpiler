import _ from 'lodash';
import match from '../match';
import getEndingTokens from './getEndingTokens';

export default (matchToken, isNonCodeSection, codeFragment) => {
  const { separators, boundary } = match;

  const warnWhenSeparatorsGetLonger = (functionName) => {
    separators.forEach((separator) => {
      if (separator.length > 1) {
        console.warn(`[!] A separator ${separator}'s length is longer than 1. The logic of ${functionName} should be updated.`);
      }
    });
  };

  const getSeparatorContinuity = (str, start) => {
    let cursor = start;
    let continuity = 0;
    const strLen = str.length;
    while (cursor < strLen) {
      if (separators.includes(str[cursor])) continuity += 1;
      else break;
      cursor += 1;
    }
    return continuity;
  };

  // TODO: Rename it...
  // ex) if input is 'ab  \t cd   e', it returns ((2 + 1 + 1) - 1) + (3 - 1) = 5
  const getTotalSeparatorContinuity = (str) => {
    warnWhenSeparatorsGetLonger(getTotalSeparatorContinuity.name);
    let cursor = 0;
    let continuity = 0;
    const strLen = str.length;
    while (cursor < strLen) {
      if (separators.includes(str[cursor])) continuity += getSeparatorContinuity(str, cursor) - 1;
      cursor += 1;
    }
    return continuity;
  };

  const trimContinuousSeparators = (str) => {
    warnWhenSeparatorsGetLonger(getTotalSeparatorContinuity.name);
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

  const endingTokens = isNonCodeSection ? getEndingTokens(matchToken) : Object.keys(boundary);
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
      let separatorContinuity = getTotalSeparatorContinuity(tokenCandidate);
      let lastSeparatorContinuity = separatorContinuity;
      while (lastSeparatorContinuity < separatorContinuity) {
        tokenCandidate = codeFragment
          .slice(cursor, cursor + tokenLengthEstimated + lastSeparatorContinuity);
        separatorContinuity = getTotalSeparatorContinuity(tokenCandidate);
        lastSeparatorContinuity = separatorContinuity;
      }
      tokenCandidate = trimContinuousSeparators(tokenCandidate);
      // Add found tokens to an array matched.
      if (tokenCandidate === endingToken) matched.push(endingToken);
    });
    if (matched.length >= 1) {
      const endingToken = _.orderBy(matched, token => token.length, ['desc'])[0]; // Get the longest matchToken
      const contentType = endingToken in boundary ? boundary[endingToken].contentType : '';
      const afterEndingToken = cursor + endingToken.length;
      const separatorContinuity = getSeparatorContinuity(codeFragment.slice(afterEndingToken), 0);
      const followingSeparators = contentType === 'identifier'
        ? codeFragment.slice(
          afterEndingToken,
          afterEndingToken + separatorContinuity,
        )
        : '';
      return {
        boundaryTokenLocation: cursor,
        boundaryToken: endingToken + followingSeparators,
      };
    }
  }
  return {
    boundaryTokenLocation: cursor,
    boundaryToken: '',
  };
};
