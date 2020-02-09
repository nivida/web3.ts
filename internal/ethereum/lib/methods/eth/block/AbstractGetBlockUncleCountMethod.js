
/**
 * @file AbstractGetBlockUncleCountMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Method from "../../../../../core/src/json-rpc/methods/Method";
import BlockNumber from "../../../types/input/BlockNumber";
import Hex from "../../../../../core/src/utility/Hex";

export default class AbstractGetBlockUncleCountMethod extends Method {
    /**
     * @param {String} rpcMethod
     * @param {Array} parameters
     * @param {JsonRpcConfiguration} config
     *
     * @constructor
     */
    constructor(rpcMethod, config, parameters) {
        super(rpcMethod, 1, config, parameters);
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @param {Configuration} moduleInstance
     */
    beforeExecution(moduleInstance) {
        this.parameters[0] = new BlockNumber(this.parameters[0]).toString();
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {String} response
     *
     * @returns {Number}
     */
    afterExecution(response) {
        return new Hex(response).toNumber();
    }
}
