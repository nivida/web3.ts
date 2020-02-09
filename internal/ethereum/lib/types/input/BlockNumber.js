
/**
 * @file BlockNumber.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @author Marek Kotewicz <marek@parity.io>
 * @date 2019
 */

import {isString} from 'lodash';
import Hex from "../../../../core/src/utility/Hex";

export default class BlockNumber {
    /**
     * TODO: Add optional config parameter for fallback solutions
     *
     * @param {String|Number} blockNumber
     *
     * @constructor
     */
    constructor(blockNumber) {
        if (BlockNumber.isPredefinedBlockNumber(blockNumber)) {
            this._blockNumber = blockNumber;

            return;
        }

        if (Hex.isValid(blockNumber)) {
            this._blockNumber = new Hex(blockNumber);

            return;
        }

        this._blockNumber = Hex.fromNumber(blockNumber);
    }

    /**
     * Returns the blockNumber value as string
     *
     * @method toString
     *
     * @returns {String}
     */
    toString() {
        if (isString(this._blockNumber)) {
            return this._blockNumber;
        }

        return this._blockNumber.toString();
    }

    /**
     * Checks if the given blockNumber properties is a pre-defined block number.
     *
     * @method isPredefinedBlockNumber
     *
     * @param blockNumber
     *
     * @returns {Boolean}
     */
    static isPredefinedBlockNumber(blockNumber) {
        return ['latest', 'pending', 'earliest'].includes(blockNumber);
    }
}
