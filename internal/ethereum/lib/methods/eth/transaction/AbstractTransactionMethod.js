/**
 * @file EthSendTransactionMethod
 * @author Samuel Furter
 * @date 2020
 */

import Method from "../../../../../core/src/json-rpc/methods/Method.js";
import TransactionOptions from "../../../../lib/types/input/TransactionOptions.js";

export default class AbstractTransactionMethod extends Method {
    /**
     * @param {String} rpcMethod
     * @param {Number} parametersAmmount
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(rpcMethod, parametersAmmount, config, parameters) {
        super(rpcMethod, parametersAmmount, config, parameters);
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
