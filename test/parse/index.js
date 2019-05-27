import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import * as Bluebird from 'bluebird';
import expected from './testList/expected';
import parse from '../../src/parse';

export default () => {
  const readdir = Bluebird.promisify(fs.readdir);
  const readFile = Bluebird.promisify(fs.readFile);

  const walk = async (testListPath) => {
    const files = await readdir(testListPath);
    const testItemList = new Array(expected.length).fill().map(Object);
    await Promise.all(
      files
        .filter(fileName => fileName !== 'expected.js')
        .map(async (fileName) => {
          const testName = fileName.slice(0, -1);
          const testNo = fileName.slice(-1);
          testItemList[testNo - 1][testName] = String(
            await readFile(path.resolve(testListPath, fileName)),
          );
        }),
    );
    return testItemList;
  };

  // TODO: Change the code design to remove dummy describe/it
  describe('dummy for async', () => {
    it('dummy for async', async () => {
      const testListPath = path.resolve(__dirname, 'testList');
      const testItemList = await walk(testListPath);
      describe('parse', () => {
        // testItemList.forEach((testItem, testNo) => {
        const testNo = 3;
        const testItem = testItemList[testNo];
          _.each(testItem, (rawCode, testName) => {
            it(`${testName} test #${testNo + 1}`, () => {
              parse(rawCode).should.equal(expected[testNo]);
            });
          });
        // });
      });
    });
  });
};
