/**
 * @file VersionMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import Method from "../../../../core/src/json-rpc/methods/Method";
import Hex from "../../../../core/src/utility/Hex";

export default class VersionMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('net_version', 0, config, []);
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {String} response
     *
     * @returns {Promise<Number>}
     */
    async afterExecution(response) {
        return new Hex(response).toNumber();
    }
}
