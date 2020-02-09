/**
 * @file NewAccountMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import Method from "../../../../core/src/json-rpc/methods/Method";
import Address from "../../../lib/types/input/Address";

export default class NewAccountMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('personal_newAccount', 1, config, parameters);
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {String} response
     *
     * @returns {Promise<String>}
     */
    async afterExecution(response) {
        return Address.toChecksum(response);
    }
}
