import { countBits } from './util.js';

class BitVector {
  constructor(size) {
    this.array = new Uint8Array(Math.ceil(size / 8));
    this.bitsPerElement = (this.array.BYTES_PER_ELEMENT * 8);
    this.bits = this.bitsPerElement * this.array.length;
    this.length = this.array.length;
  }

  get(index) {
    const byteIndex = Math.floor(index / this.bitsPerElement);
    const bitIndex = index % this.bitsPerElement;

    return (this.array[byteIndex] & (1 << bitIndex)) > 0 ? 1 : 0;
  }

  set(index, value = 1) {
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
    this.set(index, 0);
    return this;
  }

  flip(index) {
    const byteIndex = Math.floor(index / this.bitsPerElement);
    const bitIndex = index % this.bitsPerElement;
    this.array[byteIndex] ^= (1 << bitIndex);
    return this;
  }

  test(index) {
    return !!!this.get(index);
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
      short = bitVec;
      long = this.array;
    } else {
      short = this.array;
      long = bitVec;
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

  // TODO: Revist this before publishing, for correctness.
  equals(bitVec) {
    if (bitVec.length !== this.length) {
      return false;
    }

    for (let i = 0; i < bitVec.length; i += 1) {
      if (bitVec[i] !== this.array[i]) {
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
    this.array = this.not();
    return this;
  }

  orEqual(bitVec) {
    this.array = this.or(bitVec);
    return this;
  }

  xorEqual(bitVec) {
    this.array = this.xor(bitVec);
    return this;
  }

  andEqual(bitVec) {
    this.array = this.and(bitVec);
    return this;
  }

  notEqual(bitVec) {
    this.array = this.not(bitVec);
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

  }
}

export default BitVector;