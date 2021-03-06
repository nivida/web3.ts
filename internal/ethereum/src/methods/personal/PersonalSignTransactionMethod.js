/**
 * @file PersonalSignTransactionMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import Method from "../../../../core/src/json-rpc/methods/Method";
import TransactionOptions from "../../../lib/types/input/TransactionOptions";

export default class PersonalSignTransactionMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('personal_signTransaction', 2, config, parameters);
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @returns {Promise}
     */
    async beforeExecution() {
        this.parameters[0] = new TransactionOptions(this.parameters[0]);
    }
}
