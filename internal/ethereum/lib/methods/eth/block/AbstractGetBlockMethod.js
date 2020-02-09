/**
 * @file AbstractGetBlockMethod
 * @author Samuel Furter
 * @date 2020
 */

import Method from "../../../../../core/src/json-rpc/methods/Method.js";
import BlockNumber from "../../../../../ethereum/lib/types/input/BlockNumber.js";
import Block from "../../../../../ethereum/lib/types/output/Block.js";

export default class AbstractGetBlockMethod extends Method {
    /**
     * @param {String} rpcMethod
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
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
        this.parameters[1] = !!this.parameters[1];
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
