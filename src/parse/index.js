import traverse from './traverse';
import makeTokenObject from './makeTokenObject';
import estimateToken from './estimateToken';

export default (raw) => {
  const tokenStream = [];
  let traverseIdx = 0;
  let contentType = 'rest';
  const codeLength = raw.length;

  while (traverseIdx < codeLength) {
    const {
      boundaryTokenLocation,
      boundaryToken,
    } = traverse(contentType, raw.slice(traverseIdx, raw.length + 1));
    const tokenObject = makeTokenObject(
      contentType,
      raw.slice(traverseIdx, boundaryTokenLocation + boundaryToken.length + 1),
    );
    tokenStream.push(tokenObject);
    contentType = estimateToken(boundaryToken);
    traverseIdx = boundaryTokenLocation + 1;
  }

  return tokenStream;
};
