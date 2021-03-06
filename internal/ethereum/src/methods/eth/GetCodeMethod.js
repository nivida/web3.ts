/**
 * @file GetCodeMethod.js
 * @author Samuel Furter
 * @date 2020
 */

import Method from '../../../../core/src/json-rpc/methods/Method';
import BlockNumber from "../../../lib/types/input/BlockNumber";
import Address from "../../../lib/types/input/Address";

export default class GetCodeMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_getCode', 2, config, parameters);
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @returns {Promise}
     */
    async beforeExecution() {
        this.parameters[0] = new Address(this.parameters[0]).toString();
        this.parameters[1] = new BlockNumber(this.parameters[1]).toString();
    }
}
