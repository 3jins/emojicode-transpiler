import fs from 'fs';
import path from 'path';
import * as Bluebird from 'bluebird';
import expected from './testList/expected';
import testTraverse from './testTraverse';
import testMakeTokenObject from './testMakeTokenObject';
import parse from '../../src/parse';

export default () => {
  const readdir = Bluebird.promisify(fs.readdir);
  const readFile = Bluebird.promisify(fs.readFile);

  const walk = async (testListPath) => {
    const files = await readdir(testListPath);
    const testItemList = new Array(expected.length);
    await Promise.all(
      files
        .filter(fileName => fileName !== 'expected.js')
        .map(async (fileName) => {
          const testNo = fileName.slice(-1);
          testItemList[testNo - 1] = String(
            await readFile(path.resolve(testListPath, fileName)),
          );
        }),
    );
    return testItemList;
  };

  testTraverse();
  testMakeTokenObject();

  // TODO: Change the code design to remove dummy describe/it
  describe('dummy for async', () => {
    it('dummy for async', async () => {
      const testListPath = path.resolve(__dirname, 'testList');
      const testItemList = await walk(testListPath);
      describe('parse', () => {
        testItemList.forEach((rawCode, testNo) => {
          it(`test #${testNo + 1}`, () => {
            parse(rawCode).should.equal(expected[testNo]);
          });
        });
      });
    });
  });
};
