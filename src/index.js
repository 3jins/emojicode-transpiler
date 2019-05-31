import parse from '../lib/parse';
import transform from '../lib/transform';

module.exports = (raw) => {
  const tokenStream = parse(raw);
  const transformedStream = transform(tokenStream);
  return transformedStream.join('');
};
