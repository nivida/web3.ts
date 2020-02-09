/**
 * @file GetBlockNumberMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import Method from "../../../../../core/src/json-rpc/methods/Method";
import Hex from "../../../../../core/src/utility/Hex";

export default class GetBlockNumberMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_blockNumber', 0, config, parameters);
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {String} response
     *
     * @returns {Number}
     */
    async afterExecution(response) {
        return new Hex(response).toNumber();
    }
}
