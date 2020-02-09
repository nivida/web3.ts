
/**
 * @file AbstractGetTransactionFromBlockMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Method from "../../../../../core/src/json-rpc/methods/Method";
import Transaction from "../../../types/output/Transaction";
import BlockNumber from "../../../types/input/BlockNumber";
import Hex from "../../../../../core/src/utility/Hex";

export default class AbstractGetTransactionFromBlockMethod extends Method {
    /**
     * @param {String} rpcMethod
     * @param {Array} parameters
     * @param {JsonRpcConfiguration} config
     *
     * @constructor
     */
    constructor(rpcMethod, config, parameters) {
        super(rpcMethod, 2, config, parameters);
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @param {Configuration} moduleInstance - The package where the method is called from for example Eth.
     */
    beforeExecution(moduleInstance) {
        this.parameters[0] = new BlockNumber(this.parameters[0]).toString();
        this.parameters[1] = Hex.fromNumber(this.parameters[1]).toString();
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Object} response
     *
     * @returns {Object}
     */
    afterExecution(response) {
        return new Transaction(response);
    }
}
