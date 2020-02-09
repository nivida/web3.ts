/**
 * @file GetTransactionByBlockHashAndIndexMethod.js
 * @author Samuel Furter
 * @date 2020
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
