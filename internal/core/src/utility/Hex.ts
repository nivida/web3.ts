/**
 * @file Hex.ts
 * @author Samuel Furter
 * @date 2020
 */

import BN from 'bn.js';
import randombytes from 'randombytes';
import {isBoolean, isObject, isString, isNumber} from 'lodash';
import {BigNumber} from '@ethersproject/bignumber';
import {toUtf8Bytes, toUtf8String, UnicodeNormalizationForm} from '@ethersproject/strings';
import {hexlify, arrayify, BytesLike} from '@ethersproject/bytes';

export default class Hex {
    /**
     * @property {string} sign
     */
    private sign: string;

    /**
     * @property {string} value
     */
    private value: string;

    /**
     * @param {string} value
     *
     * @constructor
     */
    constructor(value: string) {
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
     * @param {string} value
     *
     * @returns {string}
     */
    getSign(value: string): string {
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
     * @returns {string}
     */
    toString(): string {
        return this.sign + '0x' + this.value;
    }

    /**
     * Returns the given hex string as number.
     *
     * @method toNumber
     *
     * @returns {number}
     */
    toNumber(): number {
        return this.toBigNumber().toNumber();
    }

    /**
     * Returns the given hex string as string number.
     *
     * @method toNumberstring
     *
     * @returns {string}
     */
    toNumberstring(): string {
        return this.toBigNumber().toString();
    }

    /**
     * Return the given hex string as BigNumber object
     *
     * @method toBigNumber
     *
     * @returns {BigNumber}
     */
    toBigNumber(): BigNumber {
        return BigNumber.from(this.toString());
    }

    /**
     * Takes and input transforms it into BN and if it is negative value, into two's complement
     *
     * @method toTwosComplement
     *
     * @returns {string}
     */
    toTwosComplement(): string {
        return this.toBigNumber().toTwos(256).toHexString();
    }

    /**
     * Returns the given hex string as bytes array
     *
     * @method toBytes
     *
     * @returns {Array}
     */
    toBytes(): Uint8Array {
        return arrayify(this.toString());
    }

    /**
     * Return the hex string as UTF8
     *
     * @method toUTF8
     *
     * @returns {string}
     */
    toUTF8(): string {
        return toUtf8String(arrayify(this.toString()))
    }

    /**
     * Static constructor function for UTF8 values.
     *
     * @method fromUTF8
     *
     * @param {string} value
     * @param {string} normalizationForm
     *
     * @returns {Hex}
     */
    static fromUTF8(value: string, normalizationForm?: UnicodeNormalizationForm): Hex {
        return new Hex(hexlify(toUtf8Bytes(value, normalizationForm)));
    }

    /**
     * Static constructor function for numbers.
     *
     * @method fromNumber
     *
     * @param {number} value
     *
     * @returns {Hex}
     */
    static fromNumber(value: string): Hex {
        return new Hex(hexlify(value));
    }

    /**
     * Static constructor function for bytes.
     *
     * @method fromBytes
     *
     * @param {Array<string>} bytes
     *
     * @returns {Hex}
     */
    static fromBytes(bytes: BytesLike): Hex {
        return new Hex(hexlify(bytes));
    }

    /**
     * Auto converts any given value into it's hex representation.
     * And even stringifys objects before.
     *
     * @method from
     *
     * @param {BN | BigNumber | string | number} value
     *
     * @returns {Hex}
     */
    static from(value: BN | BigNumber | string | number): Hex {
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

            // @ts-ignore
            if (!isFinite(value)) {
                return Hex.fromUTF8(value);
            }
        }

        if (BigNumber.isBigNumber(value)) {
            let hex = '';

            // Ethers BigNumber
            if (value.toHexString) {
                hex = value.toHexString();
            } else { // Normal BigNumber.js object
                // @ts-ignore
                hex = value.toString(16);
            }

            return new Hex(hex);
        }

        if (BN.isBN(value)) {
            return new Hex(value.toString(16));
        }

        return Hex.fromNumber(value);
    }

    /**
     * Validates the given hex.
     *
     * @param {string} hex
     *
     * @returns {Boolean}
     */
    static isValid(hex: string): boolean {
        return (isString(hex) || isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex);
    }

    /**
     * Removes the hex prefix '0x' from the given string
     *
     * @method stripPrefix
     *
     * @param {string} value
     *
     * @returns {string}
     */
    static stripPrefix(value: string): string {
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
     * @param {number} size
     *
     * @returns {Hex}
     */
    static random(size: number): Hex {
        return new Hex('0x' + randombytes(size).toString('hex'));
    }
}
