import _ from 'lodash';
import match from '../src/match';

const { gfm, traditional } = match;

// const gfmKeys = Object.keys(gfm);
// const traditionalKeys = Object.keys(traditional);
const preResult = [];
// afmKeys.forEach((afmKey) => {
//
// });
const numGfm = Object.keys(gfm).length;
const numTraditional = Object.keys(traditional).length;
const biggerOne = numGfm > numTraditional ? gfm : traditional;
const biggerOneName = numGfm > numTraditional ? 'gfm' : 'traditional';
const smallerOne = numGfm > numTraditional ? traditional : gfm;
const smallerOneName = numGfm > numTraditional ? 'traditional' : 'gfm';

_.forEach(biggerOne, (emoji, key) => {
  const eachMatchObj = {};
  eachMatchObj[biggerOneName] = `\`${key}\``;
  preResult.push([emoji, eachMatchObj]);
});

preResult.forEach((eachMatch) => {
  const [emoji, eachMatchObj] = eachMatch;
  const smallerOneKey = _.findKey(smallerOne, value => value === emoji);
  eachMatchObj[smallerOneName] = !smallerOneKey ? '~~none~~' : `\`${smallerOneKey}\``;
});

console.log('| emoji | traditional coding keyword | GFM keyword |');
console.log('| ----- | -------------------------- | ----------- |');
preResult.forEach((eachMatch) => {
  const [emoji, { traditional: traditionalKeyword, gfm: gfmKeyword }] = eachMatch;
  console.log(`| ${emoji} | ${traditionalKeyword} | ${gfmKeyword} |`);
});

console.log(`Number of gfm keywords: ${numGfm}`);
console.log(`Number of traditional keywords: ${numTraditional}`);
console.log(`Number of combined result list: ${preResult.length}`);
