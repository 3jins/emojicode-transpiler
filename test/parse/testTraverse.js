import traverse from '../../src/parse/traverse';
import getEndingTokens from '../../src/parse/getEndingTokens';

export default () => {
  const testCases = [
    {
      token: '"',
      codeFragment: '/* 이것은 주석처럼 보이지만 사실은 문자열! */";\n  :thought_thought_balloon: 안녕',
    },
    {
      token: '//',
      codeFragment: '"이것은 문자열처럼 보이지만 사실은 주석!" :grinning:\n  :grinning: 오~ 오태식이~!',
    },
    {
      token: ':crayon: :new:',
      codeFragment: '   pet_name  :abcd: // 반려동물은 고양이가 짱이다',
    },
    {
      token: '',
      codeFragment: ':crayon:  \t :new: pet_name :abcd:',
    },
  ];

  describe('parse/traverse', () => {
    testCases.forEach((testCase, testNo) => {
      it(`traverse test #${testNo}`, () => {
        const { token, codeFragment } = testCase;
        const {
          boundaryTokenLocation,
          boundaryToken,
        } = traverse(token, codeFragment);

        const endingTokens = getEndingTokens(token);
        // console.log(token);
        // console.log(endingToken);
        // console.log(codeFragment.search(endingToken));
        // console.log(codeFragment.length);
        boundaryToken.should.be.oneOf(endingTokens);
        boundaryTokenLocation.should.equal(codeFragment.search(boundaryToken));
      });
    });
  });
};
