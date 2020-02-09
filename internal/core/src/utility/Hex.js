/**
 * @file Hex
 * @author Samuel Furter
 * @date 2020
 */

import BN from 'bn.js';
// TODO: Remove lodash
import {isBoolean, isObject, isString, isNumber} from 'lodash';
import randombytes from 'randombytes';
import {BigNumber} from '@ethersproject/bignumber';
import {toUtf8Bytes} from '@ethersproject/strings';
import {hexlify, arrayify} from '@ethersproject/bytes';

export default class Hex {
  /**
   * @param {String | Number} value
   *
   * @constructor
   */
  constructor(value) {
    if (!Hex.isValid(value)) {
      throw new Error('The given value must be a valid HEX string.');
    }

    this.sign = this.getSign(value);
    this.value = Hex.stripPrefix(value);
  }

  /**
   * Returns the sign from a hex string.
   *
   * @method getSign
   *
   * @param {String} value
   *
   * @returns {String}
   */
  getSign(value) {
    if (value.startsWith('-')) {
      return '-';
    }

    return '';
  }

  /**
   * Returns the hex string with the '0x' prefix added.
   *
   * @method toString
   *
   * @returns {String}
   */
  toString() {
    return this.sign + '0x' + this.value;
  }

  /**
   * Returns the given hex string as number.
   *
   * @method toNumber
   *
   * @returns {Number}
   */
  toNumber() {
    return this.toBigNumber().toNumber();
  }

  /**
   * Returns the given hex string as string number.
   *
   * @method toNumberString
   *
   * @returns {String}
   */
  toNumberString() {
    return this.toBigNumber().toString();
  }

  /**
   * Return the given hex string as BigNumber object
   *
   * @method toBigNumber
   *
   * @returns {BigNumber}
   */
  toBigNumber() {
    return BigNumber.from(this.toString());
  }

  /**
   * Takes and input transforms it into BN and if it is negative value, into two's complement
   *
   * @method toTwosComplement
   *
   * @returns {String}
   */
  toTwosComplement() {
    return Hex.leftPad(
      this.toBigNumber()
        .toTwos(256)
        .toHexString(),
      64
    );
  }

  /**
   * Returns the given hex string as bytes array
   *
   * @method toBytes
   *
   * @returns {Array}
   */
  toBytes() {
    return arrayify(this.toString());
  }

  /**
   * Return the hex string as UTF8
   *
   * @method toUTF8
   *
   * @returns {String}
   */
  toUTF8() {
    return toUtf8String(this.toBytes(this.toString()))
  }

  /**
   * Static constructor function for UTF8 values.
   *
   * @method fromUTF8
   *
   * @param {String} value
   * @param {String} normalizationForm
   *
   * @returns {Hex}
   */
  static fromUTF8(value, normalizationForm) {
    return new Hex(hexlify(toUtf8Bytes(value, normalizationForm)));
  }

  /**
   * Static constructor function for numbers.
   *
   * @method fromNumber
   *
   * @param {Number} value
   *
   * @returns {Hex}
   */
  static fromNumber(value) {
    return new Hex(hexlify(value));
  }

  /**
   * Static constructor function for bytes.
   *
   * @method fromBytes
   *
   * @param {Array<String>} bytes
   *
   * @returns {Hex}
   */
  static fromBytes(bytes) {
    return new Hex(hexlify(bytes));
  }

  /**
   * Auto converts any given value into it's hex representation.
   * And even stringifys objects before.
   *
   * @method toHex
   *
   * @param {String|Number|BN|Object} value
   *
   * @returns {Hex}
   */
  static from(value) {
    if (isBoolean(value)) {
      if (value === true) {
        return new Hex('0x01');
      }

      return new Hex('0x00');
    }

    if (isObject(value) && !BigNumber.isBigNumber(value) && !BN.isBN(value)) {
      return Hex.fromUTF8(JSON.stringify(value));
    }

    if (isString(value)) {
      if (
        value.startsWith('-0x') ||
        value.startsWith('-0X') ||
        value.startsWith('0x') ||
        value.startsWith('0X')
      ) {
        return new Hex(value);
      }

      if (!isFinite(value)) {
        return Hex.fromUTF8(value);
      }
    }

    if (BigNumber.isBigNumber(value)) {
      let hex = value.toString(16);

      if (value.toHexString) {
        hex = value.toHexString();
      }

      if (hex.startsWith('-')) {
        return new Hex('-0x' + hex.slice(1));
      }

      return new Hex('0x' + value.toString(16));
    }

    if (BN.isBN(value)) {
      const hex = value.toString(16);

      if (hex.startsWith('-')) {
        return new Hex('-0x' + hex.slice(1));
      }

      return new Hex('0x' + value.toString(16));
    }

    return Hex.fromNumber(value);
  }

  /**
   * Validates the given hex.
   *
   * @param {String} hex
   *
   * @returns {Boolean}
   */
  static isValid(hex) {
    return (isString(hex) || isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex);
  }

  /**
   * Removes the hex prefix '0x' from the given string
   *
   * @method stripPrefix
   *
   * @param {String} value
   *
   * @returns {String}
   */
  static stripPrefix(value) {
    if (value.startsWith('0x') || value.startsWith('0X')) {
      value = value.slice(2);
    }

    if (value.startsWith('-0x') || value.startsWith('-0X')) {
      value = value.slice(3);
    }

    return value;
  }

  /**
   * Returns a random hex string with the defined size.
   *
   * @method random
   *
   * @param {Number} size
   *
   * @returns {Hex}
   */
  static random(size) {
    return new Hex('0x' + randombytes(size).toString('hex'));
  }
}
