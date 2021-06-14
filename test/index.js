import { expect } from 'chai';
import random from 'random-seedable';

import BitVector from '../src/index.js';

const smallSize = 8;
const baseSize = 2000;
const numTests = 750;

describe('BitVector', () => {
  describe('.get(index)/.set(index) basic functionality tests.', () => {
    it(`Expect basic working on a small vector ${smallSize}`, () => {
      const bitVec = new BitVector(smallSize);

      bitVec.set(5, 1);
      expect(bitVec.get(5)).to.equal(1);
      bitVec.set(7, 1);
      expect(bitVec.get(7)).to.equal(1);
      expect(bitVec.get(1)).to.equal(0);
    });

    it('Expect bits to be succesfully overwritten.', () => {
      const bitVec = new BitVector(smallSize);

      bitVec.set(0, 1);
      expect(bitVec.get(0)).to.equal(1);
      bitVec.set(0, 0);
      expect(bitVec.get(0)).to.equal(0);
    });

    it('Expect a RangeError to be thrown when accessing an unavailable index.', () => {
      const bitSmall = new BitVector(smallSize);
      const bitBig = new BitVector(baseSize);

      expect(() => bitSmall.get(-12)).to.throw();
      expect(() => bitSmall.set(3234)).to.throw();
      expect(() => bitBig.get(-12)).to.throw();
      expect(() => bitBig.set(123123123123123)).to.throw();
      expect(() => bitSmall.set(1)).to.not.throw();
      expect(() => bitBig.get(0)).to.not.throw();
      expect(() => bitBig.set(baseSize - 1)).to.not.throw();
    });

    it(`Expect basic working on a large vector ${baseSize}`, () => {
      const bitVec = new BitVector(baseSize);
      bitVec.set(9);
      expect(bitVec.get(9)).to.equal(1);
      bitVec.set(5, 1);
      expect(bitVec.get(5)).to.equal(1);
      bitVec.set(129, 1);
      expect(bitVec.get(129)).to.equal(1);
      expect(bitVec.get(1)).to.equal(0);
      bitVec.set(671, 1);
      expect(bitVec.get(671)).to.equal(1);
      bitVec.set(7, 1);
      expect(bitVec.get(7)).to.equal(1);
      expect(bitVec.get(1999)).to.equal(0);
    });

    it('Expect random selection of bits to be accurately set.', () => {
      const bitVec = new BitVector(baseSize);
      const indices = random.randRangeArray(numTests, 0, baseSize);

      indices.forEach((index) => bitVec.set(index, 1));
      indices.forEach((index) => {
        expect(bitVec.get(index)).to.equal(1);
      });
    });

    it('Expect set bits to not be overwritten when re-set.', () => {
      const bitVec = new BitVector(baseSize);
      // Generates a random sample of indices not guaranteed to be unique.
      const indices = random.randRangeArray(numTests, 0, baseSize);
      indices.forEach((index) => bitVec.set(index));

      indices.forEach((index) => {
        expect(bitVec.get(index)).to.equal(1);
      });
    });
  });

  describe('.count() tests.', () => {
    const bitVec = new BitVector(baseSize);
    // Generates a random sample of indices not guaranteed to be unique.
    const indices = random.randRangeArray(numTests, 0, baseSize);
    const indicesSet = new Set();

    indices.forEach((index) => {
      bitVec.set(index);
      indicesSet.add(index);
    });

    expect(bitVec.count()).to.equal(indicesSet.size);
  });
});
