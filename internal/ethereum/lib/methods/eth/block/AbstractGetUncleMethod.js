
/**
 * @file AbstractGetUncleMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Method from "../../../../../core/src/json-rpc/methods/Method";
import Block from "../../../types/output/Block";
import BlockNumber from "../../../types/input/BlockNumber";
import Hex from "../../../../../core/src/utility/Hex";

export default class AbstractGetUncleMethod extends Method {
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
     * @param {Configuration} moduleInstance
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
     * @returns {Block}
     */
    afterExecution(response) {
        return new Block(response);
    }
}
