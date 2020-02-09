
/**
 * @file Block.ts
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import {BigNumber} from '@ethersproject/bignumber';
import {isArray, isString} from 'lodash';
import Transaction from './Transaction';
import Hex from "../../../../core/src/utility/Hex";
import Address from "../input/Address";
import BlockProperties from './interfaces/block/BlockProperties';

// TODO: Create BlockHeader and Block type model
export default class Block {
    /**
     * @property gasLimit
     */
    public gasLimit: number | undefined;

    /**
     * @property gasUsed
     */
    public gasUsed: number | undefined;

    /**
     * @property size
     */
    public size: number | undefined;

    /**
     * @property timestamp
     */
    public timestamp: string | number | undefined;

    /**
     * @property number
     */
    public number: number | null = null;

    /**
     * @property difficulty
     */
    public difficulty: string = '';

    /**
     * @property totalDifficulty
     */
    public totalDifficulty: string = '';

    /**
     * @property transactions
     */
    public transactions: Transaction[] | string[] = [];

    /**
     * @property miner
     */
    public miner: string = '';

    /**
     * @param {BlockProperties} block
     *
     * @constructor
     */
    public constructor(block: BlockProperties) {
        if (block.timestamp) {
            const value = BigNumber.from(block.timestamp);

            try {
                this.timestamp = value.toNumber();
            } catch (error) {
                this.timestamp = value.toString();
            }
        }

        if (block.size) {
            this.size = new Hex(block.size).toNumber();
        }

        if (block.gasLimit) {
            this.gasLimit = new Hex(block.gasLimit).toNumber();
        }

        if (block.gasUsed) {
            this.gasUsed = new Hex(block.gasUsed).toNumber();
        }

        if (block.number) {
            this.number = new Hex(block.number).toNumber();
        }

        if (block.difficulty) {
            this.difficulty = BigNumber.from(block.difficulty).toString();
        }

        if (block.totalDifficulty) {
            this.totalDifficulty = BigNumber.from(block.totalDifficulty).toString();
        }

        if (isArray(block.transactions)) {
            this.transactions = <Transaction[] | string[]>block.transactions.map(
                (item: object | string): Transaction | string => {
                    if (!isString(item)) {
                        return new Transaction(item);
                    }

                    return item;
                }
            );
        }

        if (block.miner) {
            this.miner = Address.toChecksum(block.miner);
        }
    }

    /**
     * @method toJSON
     */
    toJSON() {
        return {
            gasLimit: this.gasLimit,
            gasUsed: this.gasUsed,
            size: this.size,
            timestamp: this.timestamp,
            number: this.number,
            difficulty: this.difficulty,
            totalDifficulty: this.totalDifficulty,
            transactions: this.transactions,
            miner: this.miner
        };
    }
}
