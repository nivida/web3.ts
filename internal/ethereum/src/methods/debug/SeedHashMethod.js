
/**
 * @file SeedHashMethod.js
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2019
 */

import Method from "../../../../core/src/json-rpc/methods/Method";
import Hex from "../../../../core/src/utility/Hex";

export default class SeedHashMethod extends Method {
    /**
     * @param {EthereumConfiguration} config
     *
     * @constructor
     */
    constructor(config) {
        super('debug_seedHash', 0, config, []);
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @returns {Promise}
     */
    async beforeExecution() {
        this.parameters[0] = Hex.fromNumber(this.parameters[0]).toString();
    }
}
