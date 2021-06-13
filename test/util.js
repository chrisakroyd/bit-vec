import { countBits } from '../src/util.js';
import { expect } from 'chai';

const bitData = [
  { input: 1, expected: 1 },
  { input: 2, expected: 1 },
  { input: 3, expected: 2 },
  { input: 4, expected: 1 },
  { input: 9, expected: 2 },
  { input: 255, expected: 8 },
  { input: 34224, expected: 6 },
  { input: 6374221234, expected: 21 },
  { input: 1374212244, expected: 13 },
  { input: 2 ** 31, expected: 1 },
  { input: 2 ** 27, expected: 1 },
  { input: 2 ** 12, expected: 1 },
];

describe('Util tests', () => {
  describe('countBits(num) tests.', () => {
    bitData.forEach((test) => {
      it(`Expect ${test.input} to result in ${test.expected}`, () => {
        expect(countBits(test.input)).to.equal(test.expected);
      });
    });
  });
});
