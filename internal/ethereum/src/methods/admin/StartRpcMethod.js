
/**
 * @file StartRpcMethod.js
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2019
 */

import Method from "../../../../core/src/json-rpc/methods/Method";

export default class StartRpcMethod extends Method {
    /**
     * @param {Array} parameters
     * @param {Configuration} config
     *
     * @constructor
     */
    constructor(config, parameters) {
        super('admin_startRPC', 4, config, parameters);
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @returns {Promise}
     */
    async beforeExecution() {
        if (this.parameters[1]) {
            this.parameters[1] = Hex.fromNumber(this.parameters[1]).toString();
        }
    }
}
