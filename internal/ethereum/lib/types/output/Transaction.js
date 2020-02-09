
/**
 * @file Transaction
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import {BigNumber} from '@ethersproject/bignumber';
import TransactionReceipt from './TransactionReceipt';

export default class Transaction extends TransactionReceipt {
    /**
     * @param {Object} transaction
     *
     * @constructor
     */
    constructor(transaction) {
        super(transaction);

        this.nonce = transaction.nonce;
        this.gasPrice = transaction.gasPrice;
        this.value = transaction.value;
    }

    /**
     * Getter for the hash property.
     *
     * @property hash
     *
     * @returns {String}
     */
    get hash() {
        return this.properties.hash;
    }

    /**
     * Setter for the hash property.
     *
     * @property hash
     *
     * @param {String} hash
     */
    set hash(hash) {
        this.properties.hash = hash;
    }

    /**
     * Getter for the transactionHash property.
     *
     * @proeprty transactionHash
     *
     * @returns {String}
     */
    get transactionHash() {
        return this.properties.hash;
    }

    /**
     * Setter for the transactionHash property.
     *
     * @property transactionHash
     *
     * @param {String} hash
     */
    set transactionHash(hash) {
        this.properties.hash = hash;
    }

    /**
     * Getter for the input property.
     *
     * @property input
     *
     * @returns {String}
     */
    get input() {
        return this.properties.input;
    }

    /**
     * Setter for the input property,
     *
     * @property input
     *
     * @param {String} input
     */
    set input(input) {
        this.properties.input = input;
    }

    /**
     * Getter for the v property.
     *
     * @property v
     *
     * @returns {String}
     */
    get v() {
        return this.properties.v;
    }

    /**
     * Setter for the v property.
     *
     * @property v
     *
     * @param {String} v
     */
    set v(v) {
        this.properties.v = v;
    }

    /**
     * Getter for the r property.
     *
     * @proeprty r
     *
     * @returns {String}
     */
    get r() {
        return this.properties.r;
    }

    /**
     * Setter for the r property.
     *
     * @property r
     *
     * @param r
     */
    set r(r) {
        this.properties.r = r;
    }

    /**
     * Getter for the s property.
     *
     * @property s
     *
     * @returns {String}
     */
    get s() {
        return this.properties.s;
    }

    /**
     * Setter for the s property.
     *
     * @property s
     *
     * @param {String} s
     */
    set s(s) {
        this.properties.s = s;
    }

    /**
     * Getter for the value property.
     *
     * @property value
     *
     * @returns {String|Number}
     */
    get value() {
        return this.properties.value;
    }

    /**
     * Setter for the value property.
     *
     * @property value
     *
     * @param {String} value
     */
    set value(value) {
        this.properties.value = BigNumber.from(value).toString();
    }

    /**
     * Getter for the gasPrice property.
     *
     * @property gasPrice
     *
     * @returns {String}
     */
    get gasPrice() {
        return this.properties.gasPrice;
    }

    /**
     * Setter for the gasPrice property.
     *
     * @property gasPrice
     *
     * @param gasPrice
     */
    set gasPrice(gasPrice) {
        this.properties.gasPrice = BigNumber.from(gasPrice).toString();
    }
}
