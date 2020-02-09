
/**
 * @file GetTransactionCountMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Method from "../../../../../core/src/json-rpc/methods/Method";
import Address from "../../../../lib/types/input/Address";
import BlockNumber from "../../../../lib/types/input/BlockNumber";
import Hex from "../../../../../core/src/utility/Hex";

export default class GetTransactionCountMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_getTransactionCount', 2, config, parameters);
    }

    /**
     * This method will be executed before the effective execution.
     *
     * @method beforeExecution
     *
     * @returns {Promise}
     */
    async beforeExecution() {
        this.parameters[0] = new Address(this.parameters[0]).toString();
        this.parameters[1] = new BlockNumber(this.parameters[1]).toString();
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
