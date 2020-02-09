/**
 * @file TransactionSigner.js
 * @author Samuel Furter
 * @date 2020
 */

import EthereumTx from 'ethereumjs-tx';

export default class TransactionSigner {
    /**
     * @param {Utils} utils // TODO: Remove utils dependency and use a Hex VO
     * @param {Object} formatters // TODO: Remove formatters dependency and use a Transaction VO
     *
     * @constructor
     */
    constructor(utils, formatters) {
        this.utils = utils;
        this.formatters = formatters;
    }

    /**
     * Add to be production build save
     *
     * @property Type
     *
     * @returns {String}
     */
    get type() {
        return 'TransactionSigner';
    }

    /**
     * Signs the transaction
     *
     * @param {Object} transaction
     * @param {String} privateKey
     *
     * @returns {Promise<{messageHash, v, r, s, rawTransaction}>}
     */
    async sign(transaction, privateKey) {
        if (!privateKey) {
            throw new Error('No privateKey given to the TransactionSigner.');
        }

        if (privateKey.startsWith('0x')) {
            privateKey = privateKey.substring(2);
        }

        const ethTx = new EthereumTx(transaction);
        ethTx.sign(Buffer.from(privateKey, 'hex'));

        const validationResult = ethTx.validate(true);

        if (validationResult !== '') {
            throw new Error(`TransactionSigner Error: ${validationResult}`);
        }

        const rlpEncoded = ethTx.serialize().toString('hex');
        const rawTransaction = '0x' + rlpEncoded;
        const transactionHash = this.utils.keccak256(rawTransaction);

        return {
            messageHash: Buffer.from(ethTx.hash(false)).toString('hex'),
            v: '0x' + Buffer.from(ethTx.v).toString('hex'),
            r: '0x' + Buffer.from(ethTx.r).toString('hex'),
            s: '0x' + Buffer.from(ethTx.s).toString('hex'),
            rawTransaction,
            transactionHash
        };
    }
}
