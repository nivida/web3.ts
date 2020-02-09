
/**
 * @file GetTransactionByBlockHashAndIndexMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import AbstractGetTransactionFromBlockMethod
    from "../../../../lib/methods/eth/transaction/AbstractGetTransactionFromBlockMethod";

export default class GetTransactionByBlockHashAndIndexMethod extends AbstractGetTransactionFromBlockMethod {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_getTransactionByBlockHashAndIndex', config, parameters);
    }
}
