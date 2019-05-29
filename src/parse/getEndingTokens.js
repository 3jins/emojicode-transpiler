import match from '../match';

const { separators, boundary } = match;
const boundaryTokens = Object.keys(boundary);

export default (matchToken) => {
  const trimmedMatchToken = matchToken.trim();
  if (!boundaryTokens.includes(trimmedMatchToken)) return boundaryTokens;
  const { endingToken } = boundary[trimmedMatchToken];
  if (endingToken === 'anything') return separators.concat(boundaryTokens);
  return [endingToken];
};
