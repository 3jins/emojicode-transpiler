import chai from 'chai';
import testParse from './parse';
import testTransform from './transform';

before(() => {
  chai.should();
});

testParse();
testTransform();
