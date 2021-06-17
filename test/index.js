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

  describe('.clear(index) tests.', () => {
    const bitVec = new BitVector(baseSize);
    // Generates a random sample of indices not guaranteed to be unique.
    const indices = random.randRangeArray(numTests, 0, baseSize);
    indices.forEach((index) => bitVec.set(index));

    it('Expect the set bits to be cleared.', () => {
      indices.forEach((index) => {
        expect(bitVec.get(index)).to.equal(1);
        bitVec.clear(index);
        expect(bitVec.get(index)).to.equal(0);
      });
    });
  });

  describe('.flip(index)', () => {
    const bitVec = new BitVector(baseSize);
    const indices = random.randRangeArray(numTests, 0, baseSize);
    const indicesSet = new Set(indices);
    const nonSet = Array.from({ length: baseSize }, (v, k) => k)
      .filter((index) => !indicesSet.has(index));
    const duplicates = indices.reduce((acc, curr, index, arr) => {
      if (arr.indexOf(curr) !== index && !acc.includes(curr)) acc.push(curr);
      return acc;
    }, []);

    indices.forEach((index) => bitVec.set(index));

    it('Expect all set bits to be 1.', () => {
      indices.forEach((index) => {
        expect(bitVec.get(index)).to.be.equal(1);
      });
    });

    it('Expect all non-set bits to be set to 0.', () => {
      nonSet.forEach((index) => {
        expect(bitVec.get(index)).to.be.equal(0);
      });
    });

    it('Expect the duplicate indices, once flipped to be set to 0.', () => {
      duplicates.forEach((index) => {
        bitVec.flip(index);
        expect(bitVec.get(index)).to.be.equal(0);
      });
    });

    it('Expect the duplicate indices, flipped back to be set to 1.', () => {
      duplicates.forEach((index) => {
        bitVec.flip(index);
        expect(bitVec.get(index)).to.be.equal(1);
      });
    });
  });

  describe('.test(index)', () => {
    const bitVec = new BitVector(baseSize);
    const indices = random.randRangeArray(numTests, 0, baseSize);
    const indicesSet = new Set(indices);
    const nonSet = Array.from({ length: baseSize }, (v, k) => k)
      .filter((index) => !indicesSet.has(index));

    indices.forEach((index) => bitVec.set(index));

    it('Expect all set bits to be true when tested.', () => {
      indices.forEach((index) => {
        expect(bitVec.test(index)).to.be.true;
      });
    });

    it('Expect all non-set bits to be false when tested.', () => {
      nonSet.forEach((index) => {
        expect(bitVec.test(index)).to.be.false;
      });
    });
  });

  describe('.count() tests.', () => {
    const bitVec = new BitVector(baseSize);
    // Generates a random sample of indices not guaranteed to be unique.
    const indices = random.randRangeArray(numTests, 0, baseSize);
    const indicesSet = new Set(indices);

    indices.forEach((index) => bitVec.set(index));

    it(`Expect the count to match the number of unique set indices(${indicesSet.size}).`, () => {
      expect(bitVec.count()).to.equal(indicesSet.size);
    });
  });

  describe('.setRange(begin, end, value)/.clearRange(begin, end) tests.', () => {
    const bitVec = new BitVector(baseSize);

    it('Expect to correctly set the entire range of bits.', () => {
      bitVec.setRange(0, 3);
      for (let i = 0; i < 3; i += 1) {
        expect(bitVec.get(i)).to.equal(1);
      }
    });

    it('Expect a range of bits to be cleared.', () => {
      bitVec.setRange(0, 3);
      for (let i = 0; i < 3; i += 1) {
        expect(bitVec.get(i)).to.equal(1);
      }
      bitVec.clearRange(0, 3);
      for (let i = 0; i < 3; i += 1) {
        expect(bitVec.get(i)).to.equal(0);
      }
    });
  });

  describe('.shortLong(bitVec) tests.', () => {
    const small = new BitVector(smallSize);
    const big = new BitVector(baseSize);

    it('Expect the arrays to be correctly based on size (short).', () => {
      const { short, long } = small.shortLong(big);
      expect(short).to.deep.equal(small.array);
      expect(long).to.deep.equal(big.array);
    });

    it('Expect the arrays to be correctly selected based on size (long).', () => {
      const { short, long } = big.shortLong(small);
      expect(short).to.deep.equal(small.array);
      expect(long).to.deep.equal(big.array);
    });
  });

  describe('.equals(bitVec) tests.', () => {
    it('Expect equals to be false for non-matching bit vectors ', () => {
      const bitVec1 = new BitVector(smallSize);
      const bitVec2 = new BitVector(smallSize);

      bitVec1.set(0, 1);
      bitVec2.set(1, 1);
      expect(bitVec1.equals(bitVec2)).to.be.false;
    });

    it('Expect equals to be true for non-matching bit vectors ', () => {
      const bitVec1 = new BitVector(smallSize);
      const bitVec2 = new BitVector(smallSize);

      bitVec1.set(1, 1);
      bitVec2.set(1, 1);
      expect(bitVec1.equals(bitVec2)).to.be.true;
    });

    it('Expect equals to be true for matching bit vectors of different lengths.', () => {
      const bitVec1 = new BitVector(smallSize);
      const bitVec2 = new BitVector(baseSize);

      bitVec1.set(1, 1);
      bitVec2.set(1, 1);
      expect(bitVec1.equals(bitVec2)).to.be.true;
    });
  });

  describe('.or(bitVec)/.orEqual(bitVec) tests.', () => {
    it('Expect or operation to successfully perform for vectors of the same size.', () => {
      const bitVec1 = new BitVector(smallSize);
      const bitVec2 = new BitVector(smallSize);

      bitVec1.set(0, 1);
      bitVec2.set(1, 1);
      expect(bitVec1.array[0]).to.equal(1);
      expect(bitVec2.array[0]).to.equal(2);
      expect(bitVec1.or(bitVec2).array[0]).to.equal(3);
    });

    it('Expect or to perform operation for bit vectors of different lengths.', () => {
      const bitVec1 = new BitVector(smallSize);
      const bitVec2 = new BitVector(baseSize);

      bitVec1.set(0, 1);
      bitVec2.set(1, 1);
      expect(bitVec1.or(bitVec2).array[0]).to.equal(3);
    });

    it('Expect orEqual to perform or operation and assign to the existing BitVector.', () => {
      const bitVec1 = new BitVector(smallSize);
      const bitVec2 = new BitVector(smallSize);

      bitVec1.set(0, 1);
      bitVec2.set(1, 1);
      expect(bitVec1.array[0]).to.equal(1);
      expect(bitVec2.array[0]).to.equal(2);
      bitVec1.orEqual(bitVec2);
      expect(bitVec1.array[0]).to.equal(3);
    });
  });

  describe('.and(bitVec)/.andEqual(bitVec) tests.', () => {
    it('Expect and operation to successfully perform for vectors of the same size.', () => {
      const bitVec1 = new BitVector(smallSize);
      const bitVec2 = new BitVector(smallSize);

      bitVec1.set(0, 1);
      bitVec2.set(1, 1);
      expect(bitVec1.array[0]).to.equal(1);
      expect(bitVec2.array[0]).to.equal(2);
      expect(bitVec1.and(bitVec2).array[0]).to.equal(0);
    });

    it('Expect and to perform operation for bit vectors of different lengths.', () => {
      const bitVec1 = new BitVector(smallSize);
      const bitVec2 = new BitVector(baseSize);

      bitVec1.set(0, 1);
      bitVec2.set(1, 1);
      expect(bitVec1.and(bitVec2).array[0]).to.equal(0);
    });

    it('Expect andEqual to perform and operation and assign to the existing BitVector.', () => {
      const bitVec1 = new BitVector(smallSize);
      const bitVec2 = new BitVector(smallSize);

      bitVec1.set(0, 1);
      bitVec2.set(1, 1);
      expect(bitVec1.array[0]).to.equal(1);
      expect(bitVec2.array[0]).to.equal(2);
      bitVec1.andEqual(bitVec2);
      expect(bitVec1.array[0]).to.equal(0);
    });
  });

  describe('.xor(bitVec)/.xorEqual(bitVec) tests.', () => {
    it('Expect xor operation to successfully perform for vectors of the same size.', () => {
      const bitVec1 = new BitVector(smallSize);
      const bitVec2 = new BitVector(smallSize);

      bitVec1.set(0, 1);
      bitVec1.set(1, 1);
      bitVec2.set(1, 1);
      expect(bitVec1.array[0]).to.equal(3);
      expect(bitVec2.array[0]).to.equal(2);
      expect(bitVec1.xor(bitVec2).array[0]).to.equal(1);
    });

    it('Expect xor to perform operation for bit vectors of different lengths.', () => {
      const bitVec1 = new BitVector(smallSize);
      const bitVec2 = new BitVector(baseSize);

      bitVec1.set(0, 1);
      bitVec1.set(1, 1);
      bitVec2.set(1, 1);
      expect(bitVec1.xor(bitVec2).array[0]).to.equal(1);
    });

    it('Expect xorEqual to perform xor operation and assign to the existing BitVector.', () => {
      const bitVec1 = new BitVector(smallSize);
      const bitVec2 = new BitVector(smallSize);

      bitVec1.set(0, 1);
      bitVec1.set(1, 1);
      bitVec2.set(1, 1);
      expect(bitVec1.array[0]).to.equal(3);
      expect(bitVec2.array[0]).to.equal(2);
      bitVec1.xorEqual(bitVec2);
      expect(bitVec1.array[0]).to.equal(1);
    });
  });

  describe('.not()/.notEqual()/.invert() tests.', () => {
    it('Expect not to invert the array.', () => {
      const bitVec = new BitVector(smallSize);

      bitVec.set(0, 1);
      bitVec.set(1, 1);
      expect(bitVec.array[0]).to.equal(3);
      expect(bitVec.not().array[0]).to.equal(252);
    });

    it('Expect notEqual to perform not operation and assign to the existing BitVector.', () => {
      const bitVec = new BitVector(smallSize);

      bitVec.set(0, 1);
      bitVec.set(1, 1);
      expect(bitVec.array[0]).to.equal(3);
      bitVec.notEqual();
      expect(bitVec.array[0]).to.equal(252);
    });

    it('Expect invert to perform the same operation as .not().', () => {
      const bitVec1 = new BitVector(smallSize);

      bitVec1.set(0, 1);
      bitVec1.set(1, 1);
      expect(bitVec1.array[0]).to.equal(3);
      bitVec1.invert();
      expect(bitVec1.array[0]).to.equal(252);
    });
  });

  describe('.isEmpty() tests.', () => {
    const bitVec = new BitVector(smallSize);

    it('Expect unset array to be empty', () => {
      expect(bitVec.isEmpty()).to.be.true;
    });

    it('Expect set array to not be empty', () => {
      bitVec.set(0, 1);
      expect(bitVec.isEmpty()).to.be.false;
    });
  });

  describe('.bitVector() tests.', () => {
    const bitVec = new BitVector(smallSize);

    it('Expect bitVector to be retrieved.', () => {
      bitVec.set(0, 1);
      expect(bitVec.bitVector()[0]).to.equal(1);
    });
  });
});
