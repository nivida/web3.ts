
/**
 * @file GetBlockUncleCountByNumberMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import AbstractGetBlockUncleCountMethod from "../../../../lib/methods/eth/block/AbstractGetBlockUncleCountMethod";

export default class GetBlockUncleCountByBlockNumberMethod extends AbstractGetBlockUncleCountMethod {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_getUncleCountByBlockNumber', config, parameters);
    }
}
