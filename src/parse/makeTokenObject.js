import match from '../match';

export default (matchToken, isNonCodeSection, codeFragment) => {
  const { boundary } = match;
  const contentType = !isNonCodeSection ? 'rest' : boundary[matchToken.trim()].contentType;

  return {
    type: contentType,
    content: codeFragment,
  };
};
