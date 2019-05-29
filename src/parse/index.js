import traverse from './traverse';
import makeTokenObject from './makeTokenObject';

export default (raw) => {
  const tokenStream = [];
  let traverseStartIdx = 0;
  let lastBoundaryToken = '';
  let isNonCodeSection = false;
  const codeLength = raw.length;

  while (traverseStartIdx < codeLength) {
    const {
      boundaryTokenLocation,
      boundaryToken,
    } = traverse(
      lastBoundaryToken,
      isNonCodeSection,
      raw.slice(traverseStartIdx + (isNonCodeSection ? 0 : lastBoundaryToken.length), raw.length),
    );
    const boundaryTokenEndLocation = boundaryTokenLocation
      + (isNonCodeSection ? 0 : lastBoundaryToken.length + boundaryToken.length);
    const tokenObject = makeTokenObject(
      lastBoundaryToken,
      isNonCodeSection,
      raw.slice(
        traverseStartIdx,
        traverseStartIdx + boundaryTokenEndLocation,
      ),
    );
    tokenStream.push(tokenObject);
    traverseStartIdx += boundaryTokenEndLocation;
    lastBoundaryToken = boundaryToken;
    isNonCodeSection = !isNonCodeSection;
  }

  return tokenStream;
};
