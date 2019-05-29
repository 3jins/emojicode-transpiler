import match from '../../src/match';
import contentTypes from '../../src/contentTypes';
import makeTokenObject from '../../src/parse/makeTokenObject';

export default () => {
  const testCases = [
    {
      matchToken: '"',
      isNonCodeSection: true,
      codeFragment: '밤 밤밤 밤 에~ 밤, 하늘을 날아~',
    },
    {
      matchToken: '/**',
      isNonCodeSection: true,
      codeFragment: 'As time time, for the moon night~ 꿈 속에서 너를 만나~',
    },
    {
      matchToken: ':crayon:  :new:  ',
      isNonCodeSection: false,
      codeFragment: 'pet_name : string :thought_ballon:',
    },
  ];
  describe('parse/makeTokenObject', () => {
    testCases.forEach((testCase, testNo) => {
      it(`makeTokenObject test #${testNo + 1}`, () => {
        const { matchToken, isNonCodeSection, codeFragment } = testCase;
        const tokenObject = makeTokenObject(matchToken, isNonCodeSection, codeFragment);

        const { boundary } = match;
        const contentType = matchToken.trim() in boundary ? boundary[matchToken.trim()].contentType : '';
        const { type, content } = tokenObject;
        type.should.equal(isNonCodeSection ? contentType : contentTypes[3]);
        content.should.equal(codeFragment);
      });
    });
  });
};
