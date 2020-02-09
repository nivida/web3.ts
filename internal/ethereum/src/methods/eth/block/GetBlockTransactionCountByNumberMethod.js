/**
 * @file GetBlockTransactionCountByNumberMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import AbstractGetBlockTransactionCountMethod
    from "../../../../lib/methods/eth/block/AbstractGetBlockTransactionCountMethod";

export default class GetBlockTransactionCountByNumberMethod extends AbstractGetBlockTransactionCountMethod {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_getBlockTransactionCountByNumber', config, parameters);
    }
}
