/**
 * @file GetGasPriceMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import Method from "../../../../../core/src/json-rpc/methods/Method.js";
import Hex from "../../../../../core/src/utility/Hex.js";

export default class GetGasPriceMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('eth_gasPrice', 0, config, []);
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {String} response
     *
     * @returns {Promise<BigNumber>}
     */
    async afterExecution(response) {
        return new Hex(response).toBigNumber();
    }
}
