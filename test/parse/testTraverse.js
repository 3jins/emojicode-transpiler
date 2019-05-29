import traverse from '../../src/parse/traverse';
import getEndingTokens from '../../src/parse/getEndingTokens';

export default () => {
  const testCases = [
    {
      matchToken: '"',
      isNonCodeSection: true,
      codeFragment: '/* 이것은 주석처럼 보이지만 사실은 문자열! */";\n  :thought_thought_balloon: 안녕',
    },
    {
      matchToken: '//',
      isNonCodeSection: true,
      codeFragment: '"이것은 문자열처럼 보이지만 사실은 주석!" :grinning:\n  :grinning: 오~ 오태식이~!',
    },
    {
      matchToken: ':crayon: :new:',
      isNonCodeSection: true,
      codeFragment: '   pet_name  :abcd: // 반려동물은 고양이가 짱이다',
    },
    {
      matchToken: '',
      isNonCodeSection: false,
      codeFragment: ':crayon:  \t :new: pet_name :abcd:',
    },
  ];

  describe('parse/traverse', () => {
    testCases.forEach((testCase, testNo) => {
      it(`traverse test #${testNo + 1}`, () => {
        const { matchToken, isNonCodeSection, codeFragment } = testCase;
        const {
          boundaryTokenLocation,
          boundaryToken,
        } = traverse(matchToken, isNonCodeSection, codeFragment);

        const endingTokens = getEndingTokens(matchToken);
        if (boundaryToken.trim().length === 0) {
          boundaryToken.should.be.oneOf(endingTokens);
        } else {
          boundaryToken.trim().should.be.oneOf(endingTokens);
        }
        boundaryTokenLocation.should.equal(codeFragment.search(boundaryToken));
      });
    });
  });
};
