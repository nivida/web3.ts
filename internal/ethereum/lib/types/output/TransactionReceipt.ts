
/**
 * @file TransactionReceipt.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @author Marek Kotewicz <marek@parity.io>
 * @date 2019
 */

import {BigNumber} from '@ethersproject/bignumber';
import {isArray} from 'lodash';
import Log from './Log';
import Address from "../input/Address";
import TransactionReceiptProperties from "./interfaces/transaction/TransactionReceiptProperties";

export default class TransactionReceipt {
    /**
     * @property blockNumber
     */
    public blockNumber: number | null = null;

    /**
     * @property transactionIndex
     */
    public transactionIndex: string | null = null;

    /**
     * @property gasPrice
     */
    public gasPrice: string = '';

    /**
     * @property value
     */
    public value: string = '';

    /**
     * @property nonce
     */
    public nonce: string = '';

    /**
     * @property gas
     */
    public gas: string = '';

    /**
     * @property cumulativeGasUsed
     */
    public cumulativeGasUsed: string = '';

    /**
     * @property gasUsed
     */
    public gasUsed: string = '';

    /**
     * @property to
     */
    public to: string | null = null;

    /**
     * @property from
     */
    public from: string = '';

    /**
     * @property logs
     */
    public logs: Log[] = [];

    /**
     * @property contractAddress
     */
    public contractAddress: string = '';

    /**
     * @property status
     */
    public status: boolean | null = null;

    /**
     * @property transactionHash
     */
    public transactionHash: string = '';

    /**
     * @property logsBloom
     */
    public logsBloom: string = '';

    /**
     * @property root
     */
    public root: string = '';

    /**
     * @property blockHash
     */
    public blockHash: string = '';

    /**
     * @param {Object} receipt
     *
     * @constructor
     */
    constructor(receipt: TransactionReceiptProperties) {
        if (receipt.blockNumber) {
            this.blockNumber = BigNumber.from(receipt.blockNumber).toNumber();
        }

        if (receipt.value) {
            this.value = BigNumber.from(receipt.value).toString();
        }

        if (receipt.to && Address.isValid(receipt.to)) {
            // tx.to could be `0x0` or `null` while contract creation
            this.to = Address.toChecksum(receipt.to);
        }

        if (isArray(receipt.logs)) {
            this.logs = <Log[]> receipt.logs.map((log) => {
                return new Log(log);
            });
        }

        if (receipt.contractAddress) {
            this.contractAddress = Address.toChecksum(receipt.contractAddress);
        }

        if (typeof receipt.status !== 'undefined' && receipt.status !== null) {
            this.status = Boolean(parseInt(receipt.status));
        }

        if (receipt.gasPrice) {
            this.gasPrice = BigNumber.from(receipt.gasPrice).toString();
        }

        if (receipt.gas) {
            this.gas = BigNumber.from(receipt.gas).toString();
        }

        if (receipt.nonce) {
            this.nonce = BigNumber.from(receipt.nonce).toString();
        }

        this.from = Address.toChecksum(receipt.from);
        this.transactionIndex = BigNumber.from(receipt.transactionIndex).toString();
        this.cumulativeGasUsed = BigNumber.from(receipt.cumulativeGasUsed).toString();
        this.gasUsed = BigNumber.from(receipt.gasUsed).toString();
        this.transactionHash = receipt.transactionHash;
        this.logsBloom = receipt.logsBloom;
        this.root = receipt.root;
        this.blockHash = receipt.blockHash;
    }

    /**
     * @method toJSON
     */
    toJSON() {
        return {
            blockNumber: this.blockNumber,
            value: this.value,
            to: this.to,
            logs: this.logs,
            contractAddress: this.contractAddress,
            status: this.status,
            from: this.from,
            transactionIndex: this.transactionIndex,
            gas: this.gas,
            nonce: this.nonce,
            cumulativeGasUsed: this.cumulativeGasUsed,
            gasUsed: this.gasUsed,
            transactionHash: this.transactionHash,
            logsBloom: this.logsBloom,
            root: this.root,
            blockHash: this.blockHash
        };
    }
}
