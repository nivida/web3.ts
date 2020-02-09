
/**
 * @file CallMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2019
 */

import Method from '../../../../core/src/json-rpc/methods/Method';
import TransactionOptions from "../../../lib/types/input/TransactionOptions";
import BlockNumber from "../../../lib/types/input/BlockNumber";

export default class CallMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     * @param {Array} parameters
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('eth_call', 2, config, parameters);
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
        this.parameters[1] = new BlockNumber(this.parameters[1]);
    }
}
