import { countBits } from './util.js';

class BitVector {
  constructor(size) {
    this.array = new Uint8Array(Math.ceil(size / 8));
    this.bitsPerElement = (this.array.BYTES_PER_ELEMENT * 8);
  }

  /**
   *  .bits() + .length() are semi-dynamic properties that may change frequently,
   *  therefore these are computed on the fly via getters.
   */
  get bits() {
    return this.bitsPerElement * this.array.length;
  }

  get length() {
    return this.array.length;
  }

  get bitVector() {
    return this.array;
  }

  set bitVector(bitArray) {
    this.array = bitArray;
  }

  rangeCheck(index) {
    if (!(index < this.bits) || index < 0) {
      throw new RangeError(`Given index ${index} out of range of bit vector length ${this.bits}`);
    }
  }

  get(index) {
    this.rangeCheck(index);
    const byteIndex = Math.floor(index / this.bitsPerElement);
    const bitIndex = index % this.bitsPerElement;

    return (this.array[byteIndex] & (1 << bitIndex)) > 0 ? 1 : 0;
  }

  set(index, value = 1) {
    this.rangeCheck(index);
    const byteIndex = Math.floor(index / this.bitsPerElement);
    const bitIndex = index % this.bitsPerElement;

    if (value) {
      this.array[byteIndex] |= (1 << bitIndex);
    } else {
      this.array[byteIndex] &= ~(1 << bitIndex);
    }

    return this;
  }

  clear(index) {
    return this.set(index, 0);
  }

  flip(index) {
    this.rangeCheck(index);
    const byteIndex = Math.floor(index / this.bitsPerElement);
    const bitIndex = index % this.bitsPerElement;
    this.array[byteIndex] ^= (1 << bitIndex);
    return this;
  }

  test(index) {
    return this.get(index) === 1;
  }

  count() {
    let c = 0;
    for (let i = 0; i < this.array.length; i += 1) {
      c += countBits(this.array[i]);
    }
    return c;
  }

  setRange(begin, end, value = 1) {
    for (let i = begin; i < end; i += 1) {
      this.set(i, value);
    }
    return this;
  }

  clearRange(begin, end) {
    this.setRange(begin, end, 0);
    return this;
  }

  shortLong(bitVec) {
    let short;
    let long;

    if (bitVec.length < this.length) {
      short = bitVec.array;
      long = this.array;
    } else {
      short = this.array;
      long = bitVec.array;
    }

    return { short, long };
  }

  or(bitVec) {
    // Get short and long arrays, assign correct variables -> for ops between two diff sized arrays.
    const { short, long } = this.shortLong(bitVec);
    const array = new Uint8Array(long.length);

    // Perform operation over shorter array.
    for (let i = 0; i < short.length; i += 1) {
      array[i] = short[i] | long[i];
    }

    // Fill in the remaining unchanged numbers from the longer array.
    for (let j = short.length; j < long.length; j += 1) {
      array[j] = long[j];
    }

    // Return a new BitVector object.
    return BitVector.fromArray(array);
  }

  xor(bitVec) {
    // Get short and long arrays, assign correct variables -> for ops between two diff sized arrays.
    const { short, long } = this.shortLong(bitVec);
    const array = new Uint8Array(long.length);

    // Perform operation over shorter array.
    for (let i = 0; i < short.length; i += 1) {
      array[i] = short[i] ^ long[i];
    }

    // Fill in the remaining numbers from the longer array.
    for (let j = short.length; j < long.length; j += 1) {
      array[j] = 0 ^ long[j];
    }

    // Return a new BitVector object.
    return BitVector.fromArray(array);
  }

  and(bitVec) {
    // Get short and long arrays, assign correct variables -> for ops between two diff sized arrays.
    const { short, long } = this.shortLong(bitVec);
    const array = new Uint8Array(long.length);

    // Perform operation over shorter array.
    for (let i = 0; i < short.length; i += 1) {
      array[i] = short[i] & long[i];
    }

    // Fill in the remaining unchanged numbers from the longer array.
    for (let j = short.length; j < long.length; j += 1) {
      array[j] = long[j];
    }

    // Return a new BitVector object.
    return BitVector.fromArray(array);
  }

  equals(bitVec) {
    const { short, long } = this.shortLong(bitVec);

    for (let i = 0; i < short.length; i += 1) {
      if (short[i] !== long[i]) {
        return false;
      }
    }

    // If the longer array is all 0 then they are equal, if not then they are not.
    // equiv to padding shorter bit array to larger array length and comparing.
    // Allows comparisons along vecs of different length.
    for (let j = short.length; j < long.length; j += 1) {
      if (long[j] !== 0) {
        return false;
      }
    }

    return true;
  }

  not() {
    const array = new Uint8Array(this.array.length);

    for (let i = 0; i < this.array.length; i += 1) {
      array[i] = ~this.array[i];
    }

    return BitVector.fromArray(array);
  }

  invert() {
    this.array = this.not().array;
    return this;
  }

  orEqual(bitVec) {
    this.array = this.or(bitVec).array;
    return this;
  }

  xorEqual(bitVec) {
    this.array = this.xor(bitVec).array;
    return this;
  }

  andEqual(bitVec) {
    this.array = this.and(bitVec).array;
    return this;
  }

  notEqual() {
    this.array = this.not().array;
    return this;
  }

  isEmpty() {
    for (let i = 0; i < this.array.length; i += 1) {
      if (this.array[i] !== 0) {
        return false;
      }
    }
    return true;
  }

  toArray() {
    return this.array;
  }

  static fromArray(bitVec) {
    const newBitVec = new BitVector(0);
    newBitVec.bitVector = bitVec;
    return newBitVec;
  }
}

export default BitVector;
