/**
 * @file EstimateGasMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import Method from '../../../../core/src/json-rpc/methods/Method.js';
import TransactionOptions from "../../../lib/types/input/TransactionOptions.js";
import Hex from "../../../../core/src/utility/Hex.js";

export default class EstimateGasMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_estimateGas', 1, config, parameters);
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
