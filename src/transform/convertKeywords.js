import _ from 'lodash';

export default (str, keywordObj) => _.reduce(
  keywordObj,
  (convertedContent, emoji, keyword) => convertedContent
    .split(keyword)
    .join(emoji),
  str,
);
