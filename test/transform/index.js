import transform from '../../src/transform';
import testDataList from './testList/testDataList';
import expected from './testList/expected';

export default () => {
  describe('transform', () => {
    testDataList.forEach((testData, testNo) => {
      it(`transform test #${testNo + 1}`, () => {
        const result = transform(testData);
        result.should.eql(expected[testNo]);
      });
    });
  });
};
