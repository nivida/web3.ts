/**
 * @file UnlockAccountMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import Method from "../../../../core/src/json-rpc/methods/Method";
import Address from "../../../lib/types/input/Address";

export default class UnlockAccountMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('personal_unlockAccount', 3, config, parameters);
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @returns {Promise}
     */
    async beforeExecution() {
        this.parameters[0] = new Address(this.parameters[0]);
    }
}
