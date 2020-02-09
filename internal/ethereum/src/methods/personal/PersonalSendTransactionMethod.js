
/**
 * @file PersonalSendTransactionMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Method from "../../../../core/src/json-rpc/methods/Method";
import TransactionOptions from "../../../lib/types/input/TransactionOptions";

export default class PersonalSendTransactionMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('personal_sendTransaction', 2, config, parameters);
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
