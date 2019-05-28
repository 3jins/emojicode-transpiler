import match from '../match';

const { separators, boundary } = match;
const boundaryTokens = Object.keys(boundary);

export default (matchToken) => {
  if (!matchToken) return boundaryTokens;
  const { endingToken } = boundary[matchToken];
  if (endingToken === 'anything') return separators.concat(boundaryTokens);
  return [endingToken];
};
