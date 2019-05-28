import traverse from './traverse';
import makeTokenObject from './makeTokenObject';
// import estimateToken from './estimateToken';

export default (raw) => {
  const tokenStream = [];
  let traverseStartIdx = 0;
  let lastBoundaryToken = '';
  const codeLength = raw.length;

  while (traverseStartIdx < codeLength) {
    const {
      boundaryTokenLocation,
      boundaryToken,
    } = traverse(lastBoundaryToken, raw.slice(traverseStartIdx, raw.length + 1));
    const tokenObject = makeTokenObject(
      lastBoundaryToken,
      raw.slice(traverseStartIdx, boundaryTokenLocation + boundaryToken.length + 1),
    );
    tokenStream.push(tokenObject);
    traverseStartIdx += boundaryTokenLocation + 1;
    lastBoundaryToken = boundaryToken;
  }

  return tokenStream;
};
