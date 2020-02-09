
/**
 * @file GetBlockTransactionCountByHashMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import AbstractGetBlockTransactionCountMethod
    from "../../../../lib/methods/eth/block/AbstractGetBlockTransactionCountMethod";

export default class GetBlockTransactionCountByHashMethod extends AbstractGetBlockTransactionCountMethod {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_getBlockTransactionCountByHash', config, parameters);
    }
}
