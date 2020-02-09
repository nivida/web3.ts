
/**
 * @file GetCoinbaseMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Method from "../../../../../core/src/json-rpc/methods/Method";

export default class GetCoinbaseMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('eth_coinbase', 0, config, []);
    }
}
