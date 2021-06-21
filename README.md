# bit-vec

[![Coverage Status](https://coveralls.io/repos/github/chrisakroyd/bit-vec/badge.svg?branch=main)](https://coveralls.io/github/chrisakroyd/bit-vec?branch=main)
[![npm version](https://badge.fury.io/js/bit-vec.svg)](https://badge.fury.io/js/bit-vec)
![npm](https://img.shields.io/npm/dm/bit-vec)

A lightweight, performant and well documented BitArray/BitVector implementation written in javascript.

## Installing
Via NPM: `npm install bit-vec --save`.

## Getting Started

After installing 
```js
import BitVector from 'bit-vec';

const bitVec = new BitVector(8);
```

Example Usage:


```js
import BitVector from 'bit-vec';

const bitVec = new BitVector(8);
bitVec.set(5, 1);
bitVec.test(5); // true
bitVec.flip(5);
bitVec.test(5); // false

// Chaining.
bitVec
  .set(5)
  .set(3)
  .set(1)
  .clearRange(0, 4)
  .test(3); // false

```

## Condensed Documentation

Below is a condensed form of the documentation, each is a function that can be found on the BitVector object, called like so.

```js
const bitVec = new BitVector(42);
bitVec.test(34); // false
bitVec.set(34, 1);
bitVec.test(34); // true
```


| Method | Parameters | Return |
| ----------- | -------- | ------ |
| [.get(index)](#get) | `index:Number` | Number, 1 if set, 0 if not. |
| [.set(index)](#set) | `index:Number` | Returns `this` with the bit set. |
| [.test(index)](#test) | `index:Number` | Returns Boolean `true` if index is set, `false` otherwise . |
| [.clear(index)](#clear) | `index:Number` | Returns `this` with cleared bit. |
| [.flip(index)](#flip) | `index:Number` | Returns `this` with flipper bit. |
| [.count()](#count) | `None` | Returns `Number` number of indices currently set to 1. |
| [.setRange(begin, end, value = 1)](#setrange) | `begin:Number, end:Number, value:Number` | Returns `this` with bits set.|
| [.clearRange(begin, end)](#clearrange) | `begin:Number, end:Number` | Returns `this` with bits cleared. |
| [.equals(bitVec)](#equals) | `bitVec:BitVector` | Returns Boolean `true` if the two bit vectors are equal, `false` otherwise.  |
| [.notEquals(bitVec)](#notequals) | `bitVec:BitVector` | Returns Boolean `true` if the two bit vectors are different, `false` otherwise.  |
| [.or(bitVec)](#or) | `bitVec:BitVector` | Returns new `BitVector` object with the result of the operation.|
| [.xor(bitVec)](#xor) | `bitVec:BitVector` | Returns new `BitVector` object with the result of the operation.|
| [.and(bitVec)](#and) | `bitVec:BitVector` | Returns new `BitVector` object with the result of the operation.|
| [.not()](#not) | `None` | Returns new `BitVector` object with the result of the operation. |
| [.invert()](#invert) | `None` | Returns `this` with updated array. |
| [.orEqual(bitVec)](#orequal) | `bitVec:BitVector` | Returns new `BitVector` object with the result of the operation.|
| [.xorEqual(bitVec)](#xorequal) | `bitVec:BitVector` | Returns new `BitVector` object with the result of the operation.|
| [.andEqual(bitVec)](#andequal) | `bitVec:BitVector` | Returns new `BitVector` object with the result of the operation.|
| [.notEqual()](#notequal) | `None` | Returns new `BitVector` object with the result of the operation. |
| [.isEmpty()](#isempty) | `None` |Returns Boolean `true` if the bit vector has no set bits, `false` otherwise. |

## Full Documentation

---

### get
`bitVec.get(index)`

Performs a get operation on the given index, retrieving the stored value (0 or 1).

##### Parameters
* index -> Number for index: 0 <= index < bitVec.bits.

##### Returns
Number, 1 if set, 0 otherwise.

##### Example

```js
bitVec.get(52); // 0
```

---

### set
`bitVec.set(index)`

Performs a set operation on the given index, setting the value to either 0 or 1.

##### Parameters
* index -> Number for index: 0 <= index < bitVec.bits.
* value -> Number, 0 or 1, defaults to 1.

##### Returns
Returns `BitVector` for chaining with the bit set.

##### Example

```js
bitVec.set(52); // BitVector
```

---

### test
`bitVec.test(index)`

Tests whether the given index is set to 1.

##### Parameters
* index -> Number for index: 0 <= index < bitVec.bits.

##### Returns
Returns Boolean `true` if index is set, `false` otherwise .

##### Example

```js
bitVec.set(52, 1);
bitVec.test(52); // true
```

---

### clear
`bitVec.clear(index)`

Clears the bit at the given index.

##### Parameters
* index -> Number for index: 0 <= index < bitVec.bits.

##### Returns
Returns `BitVector` for chaining with the bit cleared.

##### Example

```js
bitVec.set(52, 1);
bitVec.test(52); // true
```

---

### flip
`bitVec.flip(index)`

Flips the bit at the given index.

##### Parameters
* index -> Number for index: 0 <= index < bitVec.bits.

##### Returns
Returns `BitVector` for chaining with the bit cleared.

##### Example

```js
bitVec.flip(52);
```

---

### count
`bitVec.count()`

Counts the number of set bits in the bit vector.

##### Parameters
* None

##### Returns
Returns `Number` number of indices currently set to 1.

##### Example

```js
bitVec.count();
```

---

### setRange
`bitVec.setRange(begin, end, value = 1)`

Sets a range of bits from begin to end.

##### Parameters
* begin -> Number for index: 0 <= index < bitVec.bits.
* end -> Number for index: 0 <= index < bitVec.bits.
* value -> The value to set the index to (0 or 1).

##### Returns
Returns `this` with bits set.

##### Example

```js
bitVec.setRange(2, 6);
```

---

### clearRange
`bitVec.clearRange(begin, end)`

Clears a range of bits from begin to end.

##### Parameters
* begin -> Number for index: 0 <= index < bitVec.bits.
* end -> Number for index: 0 <= index < bitVec.bits.

##### Returns
Returns `this` with bits cleared.

##### Example

```js
bitVec.clearRange(2, 6);
```

---

### equals
`bitVec.equals(otherBitVec)`

Determines if two bit vectors are equal.

##### Parameters
* bitVec -> BitVector, instance of BitVector class.

##### Returns
Returns Boolean `true` if the two bit vectors are equal, `false` otherwise.

##### Example

```js
bitVec.equals(otherBitVec);
```

---

### notEquals
`bitVec.notEquals(otherBitVec)`

Determines if two bit vectors are not equal.

##### Parameters
* bitVec -> BitVector, instance of BitVector class.

##### Returns
Returns Boolean `true` if the two bit vectors are equal, `false` otherwise.

##### Example

```js
bitVec.notEquals(otherBitVec);
```

---

### or
`bitVec.or(otherBitVec)`

Performs the bitwise or operation between two BitVectors and returns the result as a
new BitVector object.

##### Parameters
* bitVec -> BitVector, instance of BitVector class.

##### Returns
Returns new `BitVector` object with the result of the operation.

##### Example

```js
bitVec.or(otherBitVec);
```

---

### xor
`bitVec.xor(otherBitVec)`

Performs the bitwise xor operation between two BitVectors and returns the result as a
new BitVector object.

##### Parameters
* bitVec -> BitVector, instance of BitVector class.

##### Returns
Returns new `BitVector` object with the result of the operation.

##### Example

```js
bitVec.xor(otherBitVec);
```

---

### and
`bitVec.and(otherBitVec)`

Performs the bitwise and operation between two BitVectors and returns the result as a
new BitVector object.

##### Parameters
* bitVec -> BitVector, instance of BitVector class.

##### Returns
Returns new `BitVector` object with the result of the operation.

##### Example

```js
bitVec.and(otherBitVec);
```

---

### not
`bitVec.not()`

Performs the bitwise not operation between two BitVectors and returns the result as a
new BitVector object.

##### Parameters
* None

##### Returns
Returns new `BitVector` object with the result of the operation.

##### Example

```js
bitVec.not();
```

---

### invert
`bitVec.invert()`

Inverts this BitVector, alias of .not().

##### Parameters
* None

##### Returns
Returns new `BitVector` object with the result of the operation.

##### Example

```js
bitVec.invert();
```

---

### orEqual
`bitVec.orEqual(otherBitVec)`

Performs the bitwise or operation between two BitVectors and assigns the result to
this BitVector.

##### Parameters
* bitVec -> BitVector, instance of BitVector class.

##### Returns
Returns `this` for chaining with the bits set.

##### Example

```js
bitVec.orEqual(otherBitVec);
```

---

### xorEqual
`bitVec.xorEqual(otherBitVec)`

Performs the bitwise xor operation between two BitVectors and assigns the result to
this BitVector.

##### Parameters
* bitVec -> BitVector, instance of BitVector class.

##### Returns
Returns `this` for chaining with the bits set.

##### Example

```js
bitVec.xorEqual(otherBitVec);
```

---

### andEqual
`bitVec.andEqual(otherBitVec)`

Performs the bitwise and operation between two BitVectors and assigns the result to
this BitVector.

##### Parameters
* bitVec -> BitVector, instance of BitVector class.

##### Returns
Returns `this` for chaining with the bits set.

##### Example

```js
bitVec.andEqual(otherBitVec);
```

---

### notEqual
`bitVec.notEqual(otherBitVec)`

Performs the bitwise not operation between two BitVectors and assigns the result to
this BitVector.

##### Parameters
* bitVec -> BitVector, instance of BitVector class.

##### Returns
Returns `this` for chaining with the bits set.

##### Example

```js
bitVec.notEqual(otherBitVec);
```

---

### isEmpty
`bitVec.isEmpty()`

Tests whether this BitVector has any set bits.

##### Parameters
* bitVec -> BitVector, instance of BitVector class.

##### Returns
Returns Boolean `true` if the bit vector has no set bits, `false` otherwise.

##### Example

```js
bitVec.isEmpty();
```

---



# License
See [LICENSE](https://github.com/ChrisAkroyd/bit-vec/blob/master/LICENSE) file.

# Resources

* [Bit Array Overview](https://en.wikipedia.org/wiki/Bit_array)
